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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useBlobPhotos } from "@/hooks/useBlobPhotos";
import { Lock, LogOut, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ADMIN_PASSWORD = "guru2024";

const STATIC_PHOTOS = [
  {
    id: "static-1",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.44.57 AM.jpeg",
    name: "Photo 1",
  },
  {
    id: "static-2",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.45.16 AM.jpeg",
    name: "Photo 2",
  },
  {
    id: "static-3",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.45.19 AM.jpeg",
    name: "Photo 3",
  },
  {
    id: "static-4",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.45.21 AM.jpeg",
    name: "Photo 4",
  },
  {
    id: "static-5",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.16 AM.jpeg",
    name: "Photo 5",
  },
  {
    id: "static-6",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.17 AM.jpeg",
    name: "Photo 6",
  },
  {
    id: "static-7",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.19 AM.jpeg",
    name: "Photo 7",
  },
  {
    id: "static-8",
    src: "/assets/WhatsApp Image 2026-02-14 at 10.46.20 AM.jpeg",
    name: "Photo 8",
  },
];

function getHiddenStaticIds(): string[] {
  try {
    const stored = localStorage.getItem("guru_hidden_static_photos");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHiddenStaticIds(ids: string[]) {
  try {
    localStorage.setItem("guru_hidden_static_photos", JSON.stringify(ids));
  } catch {
    // ignore
  }
}

function getAdminSession(): boolean {
  return sessionStorage.getItem("guru_admin") === "true";
}

export default function Photos() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadingFileName, setUploadingFileName] = useState<string | null>(
    null,
  );

  // Admin state
  const [isAdmin, setIsAdmin] = useState(getAdminSession);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Hidden static photos
  const [hiddenStaticIds, setHiddenStaticIds] =
    useState<string[]>(getHiddenStaticIds);

  const {
    photos,
    addPhoto,
    removePhoto,
    clearAll,
    isUploading,
    error: blobError,
  } = useBlobPhotos();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setValidationError(null);
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
        setUploadingFileName(file.name);
        setUploadProgress(0);
        await addPhoto({
          file,
          onProgress: (pct) => setUploadProgress(pct),
        });
        setUploadProgress(null);
        setUploadingFileName(null);
      } catch (err) {
        errors.push(
          `${file.name}: ${
            err instanceof Error ? err.message : "Failed to upload photo."
          }`,
        );
        setUploadProgress(null);
        setUploadingFileName(null);
      }
    }

    if (errors.length > 0) setValidationError(errors.join(" "));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = async (id: string) => {
    setValidationError(null);
    try {
      await removePhoto(id);
    } catch (err) {
      setValidationError(
        err instanceof Error ? err.message : "Failed to remove photo.",
      );
    }
  };

  const handleClearAll = async () => {
    setValidationError(null);
    try {
      await clearAll();
    } catch (err) {
      setValidationError(
        err instanceof Error ? err.message : "Failed to clear photos.",
      );
    }
  };

  const handleRemoveStatic = (id: string) => {
    const updated = [...hiddenStaticIds, id];
    setHiddenStaticIds(updated);
    saveHiddenStaticIds(updated);
  };

  const handleAdminLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("guru_admin", "true");
      setIsAdmin(true);
      setShowLoginModal(false);
      setPasswordInput("");
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("guru_admin");
    setIsAdmin(false);
  };

  const visibleStaticPhotos = STATIC_PHOTOS.filter(
    (p) => !hiddenStaticIds.includes(p.id),
  );

  const blobErrorMessage = blobError
    ? blobError instanceof Error
      ? blobError.message
      : String(blobError)
    : null;

  const displayError = validationError || blobErrorMessage;
  const totalCount = visibleStaticPhotos.length + photos.length;
  const isProcessing = isUploading || uploadProgress !== null;

  return (
    <section id="photos" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Photos
            </h2>
            <p className="text-lg text-muted-foreground">Our Gallery</p>
            {!isAdmin && (
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="absolute bottom-0 right-0 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors p-1"
                aria-label="Admin login"
                data-ocid="photos.open_modal_button"
                title="Admin"
              >
                <Lock className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Admin login modal */}
          {showLoginModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div
                className="bg-background rounded-lg shadow-xl p-6 w-full max-w-sm mx-4"
                data-ocid="photos.modal"
              >
                <h3 className="text-lg font-semibold mb-4">Admin Login</h3>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  className="mb-3"
                  data-ocid="photos.input"
                  autoFocus
                />
                {loginError && (
                  <p
                    className="text-destructive text-sm mb-3"
                    data-ocid="photos.error_state"
                  >
                    {loginError}
                  </p>
                )}
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowLoginModal(false);
                      setPasswordInput("");
                      setLoginError("");
                    }}
                    data-ocid="photos.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAdminLogin}
                    data-ocid="photos.confirm_button"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          )}

          {displayError && (
            <Alert
              variant="destructive"
              className="mb-6"
              role="alert"
              aria-live="assertive"
              data-ocid="photos.error_state"
            >
              <AlertDescription className="whitespace-pre-wrap break-words">
                {displayError}
              </AlertDescription>
            </Alert>
          )}

          {/* Upload progress */}
          {isProcessing && uploadProgress !== null && (
            <div
              className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
              data-ocid="photos.loading_state"
            >
              <p className="text-sm text-blue-700 mb-2 font-medium">
                Uploading {uploadingFileName ?? "photo"}...{" "}
                {Math.round(uploadProgress)}%
              </p>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {isAdmin && (
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
              <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
                <Button
                  onClick={() => {
                    setValidationError(null);
                    fileInputRef.current?.click();
                  }}
                  disabled={isProcessing}
                  className="gap-2"
                  data-ocid="photos.upload_button"
                >
                  <Upload className="h-4 w-4" />
                  {isProcessing ? "Uploading..." : "Upload Photos"}
                </Button>
                {photos.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2"
                        data-ocid="photos.delete_button"
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear Uploaded
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent data-ocid="photos.dialog">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Clear uploaded photos?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove all {photos.length} uploaded photo
                          {photos.length !== 1 ? "s" : ""}. This cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-ocid="photos.cancel_button">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleClearAll}
                          data-ocid="photos.confirm_button"
                        >
                          Clear All
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAdminLogout}
                  className="gap-2 text-muted-foreground"
                  data-ocid="photos.button"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {totalCount} photo{totalCount !== 1 ? "s" : ""} &middot;{" "}
                <span className="text-blue-600 font-medium">Admin Mode</span>
              </div>
            </div>
          )}

          {!isAdmin && (
            <div className="text-sm text-muted-foreground text-right mb-8">
              {totalCount} photo{totalCount !== 1 ? "s" : ""}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            multiple
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Upload photos"
          />

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            data-ocid="photos.list"
          >
            {visibleStaticPhotos.map((photo, idx) => (
              <Card
                key={photo.id}
                className="group relative overflow-hidden"
                data-ocid={`photos.item.${idx + 1}`}
              >
                <div className="aspect-square relative">
                  <img
                    src={photo.src}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {isAdmin && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveStatic(photo.id)}
                        aria-label={`Remove ${photo.name}`}
                        data-ocid={`photos.delete_button.${idx + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
            {photos.map((photo, idx) => (
              <Card
                key={photo.id}
                className="group relative overflow-hidden"
                data-ocid={`photos.item.${visibleStaticPhotos.length + idx + 1}`}
              >
                <div className="aspect-square relative">
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {isAdmin && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemove(photo.id)}
                        aria-label={`Remove ${photo.name}`}
                        data-ocid={`photos.delete_button.${visibleStaticPhotos.length + idx + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
