import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: '/assets/generated/icon-consulting.dim_256x256.png',
    title: 'Strategic Consulting',
    description: 'Expert guidance to help you navigate complex business challenges and identify growth opportunities. We work closely with you to develop actionable strategies.',
  },
  {
    icon: '/assets/generated/icon-design.dim_256x256.png',
    title: 'Creative Design',
    description: 'Beautiful, user-centered design that captures your brand essence and engages your audience. From concept to execution, we bring your vision to life.',
  },
  {
    icon: '/assets/generated/icon-support.dim_256x256.png',
    title: 'Ongoing Support',
    description: 'Reliable, responsive support to keep your operations running smoothly. We\'re here whenever you need us, ensuring your continued success.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Comprehensive solutions tailored to your unique needs. We combine expertise, creativity, and dedication to deliver exceptional results.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="border-border/50 hover:border-border transition-colors">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                  <img 
                    src={service.icon} 
                    alt={`${service.title} icon`}
                    className="h-10 w-10"
                  />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
