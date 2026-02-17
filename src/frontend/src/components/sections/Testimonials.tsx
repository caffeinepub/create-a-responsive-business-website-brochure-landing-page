import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Aachal Naik',
    quote: 'Working with this team has been transformative for our business. Their expertise and dedication helped us achieve results beyond our expectations.',
  },
  {
    id: 'testimonial-2',
    name: 'Kajal Borkar',
    quote: 'The level of professionalism and attention to detail is outstanding. They truly understand what it takes to deliver exceptional service.',
  },
  {
    id: 'testimonial-3',
    name: 'Sonal Naik',
    quote: 'From start to finish, the experience was seamless. They listened to our needs and delivered solutions that perfectly aligned with our goals.',
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col space-y-4">
                  <Quote className="h-8 w-8 text-primary/40" />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                  <div className="pt-4 border-t border-border/50">
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
