import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center py-16 md:py-24 lg:py-32">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Expert Tax, Financial & Property Consulting in Goa
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-[600px]">
                GURU & ASSOCIATES SERVICES PRIVATE LIMITED provides
                comprehensive consulting services including tax planning,
                financial advisory, insurance, and property solutions across
                Marcel (office) and Ponda (Head Office), Goa.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="text-base" onClick={scrollToContact}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base"
                onClick={() =>
                  document
                    .querySelector("#services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Our Services
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
              <img
                src="/assets/generated/investment-hero.dim_1600x900.png"
                alt="GURU & ASSOCIATES SERVICES PRIVATE LIMITED - Professional investment and financial consulting services"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
