import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob } from "../backend";
import { useActor } from "./useActor";

export interface PhotoItem {
  id: string;
  url: string;
  name: string;
}

const PHOTOS_QUERY_KEY = "blob-photos";

export function useBlobPhotos() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const photosQuery = useQuery<PhotoItem[]>({
    queryKey: [PHOTOS_QUERY_KEY],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getPhotos();
      return results.map(([id, data]) => ({
        id,
        url: data.blob.getDirectURL(),
        name: data.name,
      }));
    },
    enabled: !!actor && !isFetching,
  });

  const addPhotoMutation = useMutation({
    mutationFn: async ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (pct: number) => void;
    }) => {
      if (!actor) throw new Error("Not connected");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        onProgress || (() => {}),
      );
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const success = await actor.addPhoto(id, blob, file.name);
      if (!success) throw new Error("Failed to save photo");
      return { id, url: blob.getDirectURL(), name: file.name };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PHOTOS_QUERY_KEY] });
    },
  });

  const removePhotoMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.removePhoto(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PHOTOS_QUERY_KEY] });
    },
  });

  const clearAllMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.clearPhotos();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PHOTOS_QUERY_KEY] });
    },
  });

  return {
    photos: photosQuery.data ?? [],
    isLoading: photosQuery.isLoading,
    addPhoto: addPhotoMutation.mutateAsync,
    removePhoto: removePhotoMutation.mutateAsync,
    clearAll: clearAllMutation.mutateAsync,
    isUploading: addPhotoMutation.isPending,
    isRemoving: removePhotoMutation.isPending,
    isClearing: clearAllMutation.isPending,
    error:
      addPhotoMutation.error ||
      removePhotoMutation.error ||
      clearAllMutation.error,
  };
}
