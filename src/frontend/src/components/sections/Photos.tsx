import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type PhotoItem, usePersistedPhotos } from "@/hooks/usePersistedPhotos";
import { ImageIcon, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function Photos() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    photos,
    addPhotos,
    removePhoto,
    clearAll,
    error: storageError,
    clearError,
  } = usePersistedPhotos();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setValidationError(null);
    setIsProcessing(true);

    const newPhotos: PhotoItem[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        errors.push(
          `${file.name}: Invalid file type. Please use PNG, JPG, or WebP.`,
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File too large. Maximum size is 5MB.`);
        continue;
      }

      try {
        const dataUrl = await fileToDataUrl(file);

        newPhotos.push({
          id: `${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
          dataUrl,
          name: file.name,
          size: file.size,
          type: file.type,
        });
      } catch (_err) {
        errors.push(`${file.name}: Failed to process file.`);
      }
    }

    if (errors.length > 0) {
      setValidationError(errors.join(" "));
    }

    if (newPhotos.length > 0) {
      const success = addPhotos(newPhotos);
      if (!success && !storageError) {
        setValidationError("Failed to save photos. Storage may be full.");
      }
    }

    setIsProcessing(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleRemove = (id: string) => {
    removePhoto(id);
    setValidationError(null);
    clearError();
  };

  const handleClearAll = () => {
    clearAll();
    setValidationError(null);
    clearError();
  };

  const displayError = validationError || storageError;

  return (
    <section id="photos" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Photos
            </h2>
            <p className="text-lg text-muted-foreground">
              Upload and manage your photo gallery. Supports PNG, JPG, and WebP
              formats.
            </p>
          </div>

          {displayError && (
            <Alert
              variant="destructive"
              className="mb-6"
              role="alert"
              aria-live="polite"
            >
              <AlertDescription>{displayError}</AlertDescription>
            </Alert>
          )}

          <Card className="p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {isProcessing ? "Processing..." : "Upload Photos"}
                </Button>

                {photos.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        Clear All
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear all photos?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently remove all {photos.length} photo
                          {photos.length !== 1 ? "s" : ""} from your gallery.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearAll}>
                          Clear All
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                {photos.length} photo{photos.length !== 1 ? "s" : ""}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              multiple
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload photos"
            />
          </Card>

          {photos.length === 0 ? (
            <Card className="p-12">
              <div className="text-center text-muted-foreground">
                <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No photos yet</p>
                <p className="text-sm">Click "Upload Photos" to get started</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <Card key={photo.id} className="group relative overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={photo.dataUrl}
                      alt={photo.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemove(photo.id)}
                        aria-label={`Remove ${photo.name}`}
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-card">
                    <p
                      className="text-sm font-medium truncate"
                      title={photo.name}
                    >
                      {photo.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(photo.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
