import {
  Briefcase,
  Camera,
  Film,
  Scale,
  Target,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

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
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPosterUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
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
            data-ocid="production.open_modal_button"
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

      {/* Production Modal — Upcoming Film */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowModal(false);
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
          data-ocid="production.modal"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-background border border-border shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 bg-primary p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Film className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-white leading-tight">
                  GURU & ASSOCIATE PRODUCTION
                </h2>
              </div>
              <button
                type="button"
                data-ocid="production.close_button"
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Film Content */}
            <div className="px-6 py-8 flex flex-col items-center text-center space-y-6">
              {/* Upcoming Film label */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  UP COMING FILM
                </span>
              </div>

              {/* Film Title */}
              <h1
                className="text-5xl font-extrabold tracking-tight text-foreground"
                style={{ letterSpacing: "0.1em" }}
              >
                UMESH
              </h1>

              {/* Poster Area */}
              <div className="w-full">
                {posterUrl ? (
                  <div className="relative group inline-block w-full">
                    <img
                      src={posterUrl}
                      alt="UMESH film poster"
                      className="w-full max-h-80 object-contain rounded-xl border border-border shadow-lg"
                    />
                    <button
                      type="button"
                      data-ocid="production.upload_button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold shadow hover:bg-primary/90 transition-colors"
                    >
                      <Camera className="h-3.5 w-3.5" />
                      Change Photo
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    data-ocid="production.upload_button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-4 py-12 px-6 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-colors cursor-pointer"
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
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  data-ocid="production.dropzone"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
