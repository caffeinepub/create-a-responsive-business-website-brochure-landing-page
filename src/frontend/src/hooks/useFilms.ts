import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ExternalBlob } from "../backend";
import { useActor } from "./useActor";

export interface FilmEntry {
  id: string;
  name: string;
  releaseDate: string;
  posterUrl: string | null;
}

const FILMS_QUERY_KEY = "backend-films";

export function useFilms() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  // Access the underlying raw IC actor and blob download helper from the generated Backend wrapper
  const a = actor as any;
  const rawActor: any = a?.actor;
  const downloadFile:
    | ((hash: Uint8Array) => Promise<ExternalBlob>)
    | undefined = a?._downloadFile;

  const filmsQuery = useQuery<FilmEntry[]>({
    queryKey: [FILMS_QUERY_KEY],
    queryFn: async () => {
      if (!rawActor) return [];
      const results: Array<[string, any]> = await rawActor.getFilms();
      const entries = await Promise.all(
        results.map(async ([id, data]) => {
          let posterUrl: string | null = null;
          // Candid optional: [] | [Uint8Array]
          if (data.poster && data.poster.length > 0 && downloadFile) {
            try {
              const hash = data.poster[0] as Uint8Array;
              const eb = await downloadFile(hash);
              posterUrl = eb.getDirectURL();
            } catch {
              posterUrl = null;
            }
          }
          return {
            id,
            name: data.name as string,
            releaseDate: data.releaseDate as string,
            posterUrl,
          };
        }),
      );
      return entries;
    },
    enabled: !!rawActor && !isFetching,
  });

  // Seed default UMESH film if no films exist
  useEffect(() => {
    if (!rawActor || isFetching) return;
    if (filmsQuery.isSuccess && filmsQuery.data.length === 0) {
      rawActor.addFilm("umesh", "UMESH", "11 April 2026").then(() => {
        queryClient.invalidateQueries({ queryKey: [FILMS_QUERY_KEY] });
      });
    }
  }, [
    rawActor,
    isFetching,
    filmsQuery.isSuccess,
    filmsQuery.data,
    queryClient,
  ]);

  const addFilmMutation = useMutation({
    mutationFn: async ({
      id,
      name,
      releaseDate,
    }: {
      id: string;
      name: string;
      releaseDate: string;
    }) => {
      if (!rawActor) throw new Error("Not connected");
      const success: boolean = await rawActor.addFilm(id, name, releaseDate);
      if (!success) throw new Error("Failed to add film");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FILMS_QUERY_KEY] });
    },
  });

  const removeFilmMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!rawActor) throw new Error("Not connected");
      await rawActor.removeFilm(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FILMS_QUERY_KEY] });
    },
  });

  const updatePosterMutation = useMutation({
    mutationFn: async ({
      filmId,
      file,
      onProgress,
    }: {
      filmId: string;
      file: File;
      onProgress?: (pct: number) => void;
    }) => {
      const _rawActor = (actor as any)?.actor;
      const _uploadFile:
        | ((file: ExternalBlob) => Promise<Uint8Array>)
        | undefined = (actor as any)?._uploadFile;
      if (!_rawActor || !_uploadFile) throw new Error("Not connected");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const eb = ExternalBlob.fromBytes(bytes).withUploadProgress(
        onProgress || (() => {}),
      );
      // Upload blob to IC storage, get the hash (Uint8Array) back
      const hash = await _uploadFile(eb);
      // Pass hash (Uint8Array = ExternalBlob in Candid) to the raw IC actor
      const success: boolean = await _rawActor.updateFilmPoster(filmId, hash);
      if (!success) throw new Error("Failed to update film poster");
      return filmId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FILMS_QUERY_KEY] });
    },
  });

  return {
    films: filmsQuery.data ?? [],
    isLoading: filmsQuery.isLoading,
    addFilm: addFilmMutation.mutateAsync,
    removeFilm: removeFilmMutation.mutateAsync,
    updateFilmPoster: updatePosterMutation.mutateAsync,
    isAddingFilm: addFilmMutation.isPending,
    isRemovingFilm: removeFilmMutation.isPending,
    isUpdatingPoster: updatePosterMutation.isPending,
    uploadingFilmId: updatePosterMutation.isPending
      ? ((updatePosterMutation.variables as any)?.filmId ?? null)
      : null,
    error:
      addFilmMutation.error ||
      removeFilmMutation.error ||
      updatePosterMutation.error,
  };
}
