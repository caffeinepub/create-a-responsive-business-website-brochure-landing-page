import { Target, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We focus on delivering measurable results that align with your business goals.',
  },
  {
    icon: Users,
    title: 'Client-Centered',
    description: 'Your success is our priority. We build lasting partnerships based on trust.',
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We leverage cutting-edge technology to keep you ahead of the competition.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            About Your Business
          </h2>
          <p className="text-lg text-muted-foreground sm:text-xl">
            We are a team of passionate professionals dedicated to helping businesses thrive in the digital age. 
            With years of experience and a commitment to excellence, we deliver solutions that make a real difference.
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
      </div>
    </section>
  );
}
