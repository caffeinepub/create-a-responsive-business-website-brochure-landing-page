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
  const a = actor as any;

  // Access internal Backend helpers
  const uploadFile: ((file: ExternalBlob) => Promise<Uint8Array>) | undefined =
    a
      ? (a._uploadFile?.bind(a) as (file: ExternalBlob) => Promise<Uint8Array>)
      : undefined;
  const downloadFile:
    | ((hash: Uint8Array) => Promise<ExternalBlob>)
    | undefined = a
    ? (a._downloadFile?.bind(a) as (hash: Uint8Array) => Promise<ExternalBlob>)
    : undefined;

  // Raw IC actor for methods not in the generated Backend class
  const rawActor = a ? a.actor : undefined;

  const filmsQuery = useQuery<FilmEntry[]>({
    queryKey: [FILMS_QUERY_KEY],
    queryFn: async () => {
      if (!rawActor || !downloadFile) return [];
      const results: Array<[string, any]> = await rawActor.getFilms();
      const entries = await Promise.all(
        results.map(async ([id, data]) => {
          let posterUrl: string | null = null;
          if (data.poster && data.poster.length > 0) {
            const hash = data.poster[0] as Uint8Array;
            try {
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
    enabled: !!actor && !isFetching && !!downloadFile,
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
      if (!rawActor || !uploadFile) throw new Error("Not connected");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const eb = ExternalBlob.fromBytes(bytes).withUploadProgress(
        onProgress || (() => {}),
      );
      // Upload to blob storage, get hash back
      const hash = await uploadFile(eb);
      // Pass hash (Uint8Array) to the raw actor
      const success: boolean = await rawActor.updateFilmPoster(filmId, hash);
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
