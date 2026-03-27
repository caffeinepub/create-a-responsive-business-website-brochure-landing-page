import {
  Briefcase,
  Camera,
  Film,
  Lock,
  Plus,
  Scale,
  Target,
  Trash2,
  Unlock,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

const FILMS_STORAGE_KEY = "guru_films_list";

type FilmEntry = {
  id: string;
  name: string;
  releaseDate: string;
  posterUrl: string | null;
};

function getSavedFilms(): FilmEntry[] {
  try {
    const raw = localStorage.getItem(FILMS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  // Default: UMESH
  return [
    {
      id: "umesh",
      name: "UMESH",
      releaseDate: "11 April 2026",
      posterUrl: localStorage.getItem("guru_film_poster_umesh") ?? null,
    },
  ];
}

function saveFilms(films: FilmEntry[]) {
  try {
    localStorage.setItem(FILMS_STORAGE_KEY, JSON.stringify(films));
  } catch {
    // ignore
  }
}

const features = [
  {
    icon: Target,
    title: "Expert Guidance",
    description:
      "Professional consulting services with deep expertise in tax, finance, and property matters.",
  },
  {
    icon: Users,
    title: "Client-Centered",
    description:
      "Your success is our priority. We build lasting partnerships based on trust and reliability.",
  },
  {
    icon: Zap,
    title: "Comprehensive Solutions",
    description:
      "From tax planning to property documentation, we provide end-to-end consulting services.",
  },
];

export default function About() {
  const [showModal, setShowModal] = useState(false);
  const [films, setFilms] = useState<FilmEntry[]>(getSavedFilms);
  const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUploadId = useRef<string | null>(null);

  // Admin state
  const [isFilmAdmin, setIsFilmAdmin] = useState(false);
  const [showFilmPasswordPrompt, setShowFilmPasswordPrompt] = useState(false);
  const [filmPasswordInput, setFilmPasswordInput] = useState("");
  const [filmPasswordError, setFilmPasswordError] = useState(false);

  const selectedFilm = films.find((f) => f.id === selectedFilmId) ?? null;

  function closeModal() {
    setShowModal(false);
    setSelectedFilmId(null);
    setIsAdding(false);
    setIsFilmAdmin(false);
    setShowFilmPasswordPrompt(false);
    setFilmPasswordInput("");
    setFilmPasswordError(false);
  }

  function updateFilms(updated: FilmEntry[]) {
    setFilms(updated);
    saveFilms(updated);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const targetId = activeUploadId.current;
    if (!file || !targetId) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) {
        const updated = films.map((f) =>
          f.id === targetId ? { ...f, posterUrl: dataUrl } : f,
        );
        updateFilms(updated);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function triggerUpload(filmId: string) {
    activeUploadId.current = filmId;
    fileInputRef.current?.click();
  }

  function addFilm() {
    if (!newName.trim()) return;
    const entry: FilmEntry = {
      id: Date.now().toString(),
      name: newName.trim().toUpperCase(),
      releaseDate: newDate.trim(),
      posterUrl: null,
    };
    const updated = [...films, entry];
    updateFilms(updated);
    setNewName("");
    setNewDate("");
    setIsAdding(false);
  }

  function deleteFilm(filmId: string) {
    const updated = films.filter((f) => f.id !== filmId);
    updateFilms(updated);
    if (selectedFilmId === filmId) setSelectedFilmId(null);
  }

  function handleFilmPasswordSubmit() {
    if (filmPasswordInput === "guru2024") {
      setIsFilmAdmin(true);
      setShowFilmPasswordPrompt(false);
      setFilmPasswordInput("");
      setFilmPasswordError(false);
    } else {
      setFilmPasswordError(true);
    }
  }

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            About Guru & Associates
          </h2>
          <p className="text-lg text-muted-foreground sm:text-xl">
            We are a trusted consulting firm serving clients across Goa with
            expertise in tax and financial consulting, financial advisory
            services, and comprehensive property consulting solutions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto max-w-3xl text-center mt-16 md:mt-20 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Guru & Associates is into
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Wealth Creator */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">
              GURU & ASSOCIATE (WEALTH CREATOR)
            </h3>
          </div>

          {/* Legal Firm */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">G.P. ASSOCIATE LEGAL FIRM</h3>
          </div>

          {/* Production — clickable */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-card border border-primary/40 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer group"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Film className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">
              GURU & ASSOCIATE PRODUCTION ( DIGITAL MARKETING, ADVERTISEMENT,
              ENTERTAINMENT & FILM )
            </h3>
            <span className="text-sm text-primary font-medium">
              Click to view details →
            </span>
          </button>
        </div>
      </div>

      {/* Production Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onKeyDown={(e) => {
            if (e.key === "Escape") closeModal();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="relative w-full max-w-2xl rounded-2xl bg-background border border-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 bg-primary p-6 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Film className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">
                    GURU & ASSOCIATE PRODUCTION
                  </h2>
                  {selectedFilm && (
                    <button
                      type="button"
                      onClick={() => setSelectedFilmId(null)}
                      className="text-white/70 text-sm hover:text-white mt-0.5"
                    >
                      ← Back to all films
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {/* Lock / Unlock button */}
                <button
                  type="button"
                  onClick={() => {
                    if (isFilmAdmin) {
                      setIsFilmAdmin(false);
                    } else {
                      setShowFilmPasswordPrompt(true);
                      setFilmPasswordError(false);
                      setFilmPasswordInput("");
                    }
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title={isFilmAdmin ? "Logout admin" : "Admin login"}
                  data-ocid="film_admin.toggle"
                >
                  {isFilmAdmin ? (
                    <Unlock className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  data-ocid="film_modal.close_button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Password Prompt */}
            {showFilmPasswordPrompt && (
              <div
                className="px-6 py-4 bg-muted/50 border-b border-border"
                data-ocid="film_admin.dialog"
              >
                <p className="text-sm font-semibold mb-3">
                  Enter admin password to manage films:
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Password"
                    value={filmPasswordInput}
                    onChange={(e) => {
                      setFilmPasswordInput(e.target.value);
                      setFilmPasswordError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleFilmPasswordSubmit();
                      if (e.key === "Escape") {
                        setShowFilmPasswordPrompt(false);
                        setFilmPasswordInput("");
                        setFilmPasswordError(false);
                      }
                    }}
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    data-ocid="film_admin.input"
                  />
                  <button
                    type="button"
                    onClick={handleFilmPasswordSubmit}
                    className="px-4 rounded-lg bg-primary text-white text-sm font-semibold py-2 hover:bg-primary/90 transition-colors"
                    data-ocid="film_admin.submit_button"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowFilmPasswordPrompt(false);
                      setFilmPasswordInput("");
                      setFilmPasswordError(false);
                    }}
                    className="px-4 rounded-lg border border-border text-sm py-2 hover:bg-muted transition-colors"
                    data-ocid="film_admin.cancel_button"
                  >
                    Cancel
                  </button>
                </div>
                {filmPasswordError && (
                  <p
                    className="text-red-500 text-xs mt-2"
                    data-ocid="film_admin.error_state"
                  >
                    Incorrect password
                  </p>
                )}
              </div>
            )}

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-6">
              {/* Film Detail View */}
              {selectedFilm ? (
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">
                      UP COMING FILM
                    </span>
                  </div>
                  <h1
                    className="text-5xl font-extrabold tracking-tight text-foreground"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {selectedFilm.name}
                  </h1>
                  {selectedFilm.releaseDate && (
                    <p className="text-base font-semibold text-muted-foreground">
                      Release Date:{" "}
                      <span className="text-primary">
                        {selectedFilm.releaseDate}
                      </span>
                    </p>
                  )}
                  <div className="w-full">
                    {selectedFilm.posterUrl ? (
                      <div className="relative group inline-block w-full">
                        <img
                          src={selectedFilm.posterUrl}
                          alt={`${selectedFilm.name} film poster`}
                          className="w-full max-h-80 object-contain rounded-xl border border-border shadow-lg"
                        />
                        {isFilmAdmin && (
                          <button
                            type="button"
                            onClick={() => triggerUpload(selectedFilm.id)}
                            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold shadow hover:bg-primary/90 transition-colors"
                            data-ocid="film_poster.upload_button"
                          >
                            <Camera className="h-3.5 w-3.5" />
                            Change Poster
                          </button>
                        )}
                      </div>
                    ) : isFilmAdmin ? (
                      <button
                        type="button"
                        onClick={() => triggerUpload(selectedFilm.id)}
                        className="w-full flex flex-col items-center justify-center gap-4 py-12 px-6 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-colors cursor-pointer"
                        data-ocid="film_poster.dropzone"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                          <Upload className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-primary">
                            Add Film Poster
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Click to upload a photo
                          </p>
                        </div>
                      </button>
                    ) : (
                      <div className="w-full flex flex-col items-center justify-center gap-4 py-12 px-6 rounded-xl border-2 border-dashed border-border bg-muted/30">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                          <Lock className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-muted-foreground">
                            Admin only
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Login as admin to upload a poster
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Film List View */
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">
                      UP COMING FILMS
                    </span>
                  </div>

                  {films.length === 0 && (
                    <p className="text-muted-foreground text-center py-6">
                      No films added yet.
                    </p>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    {films.map((film) => (
                      <div
                        key={film.id}
                        className="relative rounded-xl border border-border bg-card overflow-hidden group"
                      >
                        {/* Poster thumbnail */}
                        <button
                          type="button"
                          onClick={() => setSelectedFilmId(film.id)}
                          className="w-full text-left"
                        >
                          {film.posterUrl ? (
                            <img
                              src={film.posterUrl}
                              alt={film.name}
                              className="w-full h-48 object-cover"
                            />
                          ) : (
                            <div className="w-full h-48 bg-primary/5 flex flex-col items-center justify-center gap-2">
                              <Film className="h-10 w-10 text-primary/40" />
                              <span className="text-xs text-muted-foreground">
                                No poster
                              </span>
                            </div>
                          )}
                          <div className="p-3">
                            <p className="font-bold text-foreground text-sm">
                              {film.name}
                            </p>
                            {film.releaseDate && (
                              <p className="text-xs text-primary mt-0.5">
                                {film.releaseDate}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              Click to view poster →
                            </p>
                          </div>
                        </button>
                        {/* Delete button — admin only */}
                        {isFilmAdmin && (
                          <button
                            type="button"
                            onClick={() => deleteFilm(film.id)}
                            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 hover:bg-red-600 text-white transition-colors"
                            title="Delete film"
                            data-ocid="film_list.delete_button"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Film — admin only */}
                  {isFilmAdmin &&
                    (isAdding ? (
                      <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 space-y-3">
                        <input
                          type="text"
                          placeholder="Film Name (e.g. UMESH)"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          data-ocid="film_add.input"
                        />
                        <input
                          type="text"
                          placeholder="Release Date (e.g. 11 April 2026)"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={addFilm}
                            disabled={!newName.trim()}
                            className="flex-1 rounded-lg bg-primary text-white text-sm font-semibold py-2 hover:bg-primary/90 disabled:opacity-50 transition-colors"
                            data-ocid="film_add.submit_button"
                          >
                            Add Film
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsAdding(false);
                              setNewName("");
                              setNewDate("");
                            }}
                            className="px-4 rounded-lg border border-border text-sm py-2 hover:bg-muted transition-colors"
                            data-ocid="film_add.cancel_button"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAdding(true)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-primary/40 text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
                        data-ocid="film_list.open_modal_button"
                      >
                        <Plus className="h-4 w-4" />
                        Add New Film
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </section>
  );
}
