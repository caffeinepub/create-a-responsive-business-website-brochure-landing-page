import { useState, useEffect } from 'react';

export interface PhotoItem {
  id: string;
  dataUrl: string;
  name: string;
  size: number;
  type: string;
}

const STORAGE_KEY = 'guru-associates-photos';
const MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4MB limit for localStorage

export function usePersistedPhotos() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load photos from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPhotos(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to load photos from storage:', err);
      setError('Failed to load saved photos');
    }
  }, []);

  // Save photos to localStorage whenever they change
  const savePhotos = (newPhotos: PhotoItem[]) => {
    try {
      const serialized = JSON.stringify(newPhotos);
      
      // Check storage size
      if (serialized.length > MAX_STORAGE_SIZE) {
        setError('Storage limit exceeded. Please remove some photos.');
        return false;
      }
      
      localStorage.setItem(STORAGE_KEY, serialized);
      setPhotos(newPhotos);
      setError(null);
      return true;
    } catch (err) {
      console.error('Failed to save photos:', err);
      if (err instanceof Error && err.name === 'QuotaExceededError') {
        setError('Storage quota exceeded. Please remove some photos.');
      } else {
        setError('Failed to save photos');
      }
      return false;
    }
  };

  const addPhotos = (newPhotos: PhotoItem[]) => {
    const updated = [...photos, ...newPhotos];
    return savePhotos(updated);
  };

  const removePhoto = (id: string) => {
    const updated = photos.filter(photo => photo.id !== id);
    return savePhotos(updated);
  };

  const clearAll = () => {
    return savePhotos([]);
  };

  return {
    photos,
    addPhotos,
    removePhoto,
    clearAll,
    error,
    clearError: () => setError(null),
  };
}
