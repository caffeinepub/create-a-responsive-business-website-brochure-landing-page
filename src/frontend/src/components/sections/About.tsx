import { Briefcase, Film, Scale, Target, Users, Zap } from "lucide-react";

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

const divisions = [
  {
    icon: Briefcase,
    title: "GURU & ASSOCIATE (WEALTH CREATOR)",
  },
  {
    icon: Scale,
    title: "G.P. ASSOCIATE LEGAL FIRM",
  },
  {
    icon: Film,
    title:
      "GURU & ASSOCIATE PRODUCTION ( DIGIAL MARKETING,  ADVERTISEMENT , ENTERTAINMENT & FILM )",
  },
];

export default function About() {
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
          {divisions.map((division) => {
            const Icon = division.icon;
            return (
              <div
                key={division.title}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{division.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
