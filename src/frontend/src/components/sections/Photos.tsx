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
import { Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const STATIC_PHOTOS = [
  {
    id: "static-1",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.44.57 AM.jpeg",
    name: "Photo 1",
  },
  {
    id: "static-2",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.44.57 AM-1.jpeg",
    name: "Photo 2",
  },
  {
    id: "static-3",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.45.16 AM.jpeg",
    name: "Photo 3",
  },
  {
    id: "static-4",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.45.16 AM-1.jpeg",
    name: "Photo 4",
  },
  {
    id: "static-5",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.45.19 AM.jpeg",
    name: "Photo 5",
  },
  {
    id: "static-6",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.45.19 AM-1.jpeg",
    name: "Photo 6",
  },
  {
    id: "static-7",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.45.21 AM.jpeg",
    name: "Photo 7",
  },
  {
    id: "static-8",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.45.21 AM-1.jpeg",
    name: "Photo 8",
  },
  {
    id: "static-9",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.16 AM.jpeg",
    name: "Photo 9",
  },
  {
    id: "static-10",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.16 AM-1.jpeg",
    name: "Photo 10",
  },
  {
    id: "static-11",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.17 AM.jpeg",
    name: "Photo 11",
  },
  {
    id: "static-12",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.17 AM-1.jpeg",
    name: "Photo 12",
  },
  {
    id: "static-13",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.19 AM.jpeg",
    name: "Photo 13",
  },
  {
    id: "static-14",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.19 AM-1.jpeg",
    name: "Photo 14",
  },
  {
    id: "static-15",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.20 AM.jpeg",
    name: "Photo 15",
  },
  {
    id: "static-16",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.20 AM-1.jpeg",
    name: "Photo 16",
  },
];

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

    if (errors.length > 0) setValidationError(errors.join(" "));
    if (newPhotos.length > 0) {
      const success = addPhotos(newPhotos);
      if (!success && !storageError)
        setValidationError("Failed to save photos. Storage may be full.");
    }

    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

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
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Photos
            </h2>
            <p className="text-lg text-muted-foreground">Our Gallery</p>
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

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
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
                      Clear Uploaded
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Clear uploaded photos?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all {photos.length} uploaded photo
                        {photos.length !== 1 ? "s" : ""}. This cannot be undone.
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
              {STATIC_PHOTOS.length + photos.length} photo
              {STATIC_PHOTOS.length + photos.length !== 1 ? "s" : ""}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {STATIC_PHOTOS.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <div className="aspect-square">
                  <img
                    src={photo.src}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </Card>
            ))}
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
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
