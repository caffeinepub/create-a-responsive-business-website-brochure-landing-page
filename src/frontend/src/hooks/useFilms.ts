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
  // Cast to any to access film methods not yet in auto-generated types
  const a = actor as any;

  const filmsQuery = useQuery<FilmEntry[]>({
    queryKey: [FILMS_QUERY_KEY],
    queryFn: async () => {
      if (!a) return [];
      const results: Array<[string, any]> = await a.getFilms();
      return results.map(([id, data]) => ({
        id,
        name: data.name as string,
        releaseDate: data.releaseDate as string,
        posterUrl: data.poster[0]
          ? (data.poster[0] as any).getDirectURL()
          : null,
      }));
    },
    enabled: !!actor && !isFetching,
  });

  // Seed default UMESH film if no films exist
  useEffect(() => {
    if (!a || isFetching) return;
    if (filmsQuery.isSuccess && filmsQuery.data.length === 0) {
      a.addFilm("umesh", "UMESH", "11 April 2026").then(() => {
        queryClient.invalidateQueries({ queryKey: [FILMS_QUERY_KEY] });
      });
    }
  }, [a, isFetching, filmsQuery.isSuccess, filmsQuery.data, queryClient]);

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
      if (!a) throw new Error("Not connected");
      const success: boolean = await a.addFilm(id, name, releaseDate);
      if (!success) throw new Error("Failed to add film");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FILMS_QUERY_KEY] });
    },
  });

  const removeFilmMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!a) throw new Error("Not connected");
      await a.removeFilm(id);
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
      if (!a) throw new Error("Not connected");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        onProgress || (() => {}),
      );
      const success: boolean = await a.updateFilmPoster(filmId, blob);
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
