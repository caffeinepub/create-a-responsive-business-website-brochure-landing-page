import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../contact/ContactForm';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@yourbusiness.com',
    href: 'mailto:hello@yourbusiness.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Business Street, Suite 100, City, State 12345',
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Ready to take your business to the next level? We'd love to hear from you. Reach out today and let's start a conversation.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">{info.label}</p>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  );

                  return info.href ? (
                    <a
                      key={info.label}
                      href={info.href}
                      className="block p-4 rounded-lg border border-border/50 hover:border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={info.label}
                      className="p-4 rounded-lg border border-border/50"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
