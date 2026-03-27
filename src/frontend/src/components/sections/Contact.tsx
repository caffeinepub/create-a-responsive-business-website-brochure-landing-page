import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "../contact/ContactForm";
import OfficeLocationsMap from "../contact/OfficeLocationsMap";

const offices = [
  {
    name: "Head Office",
    address:
      "G-05, Aniruddh Plaza, Shantinagar Road, Nr. Corporation Bank, Ponda - Goa 403401",
    phones: ["8975739464", "7822881010"],
    email: "guru.associates36@gmail.com",
  },
  {
    name: "Branch Office",
    address:
      "FF2, First Floor Omkar Adonis Blue Plaza, Deulwada Marcel - Goa 403 107",
    phones: ["9370567036"],
    email: "guruassociatesmarcel@yahoo.com",
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
            Ready to discuss your tax, financial, or property needs? We'd love
            to hear from you. Reach out today and let's start a conversation.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Office Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Our Offices</h3>
              <div className="space-y-6">
                {offices.map((office) => (
                  <div
                    key={office.name}
                    className="p-6 rounded-lg border border-border/50 bg-card space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-primary">
                      {office.name}
                    </h4>

                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded underline decoration-muted-foreground/30 hover:decoration-foreground/50"
                      >
                        {office.address}
                      </a>
                    </div>

                    {office.phones.length > 0 && (
                      <div className="space-y-2">
                        {office.phones.map((phone) => (
                          <div
                            key={phone}
                            className="flex items-center space-x-3"
                          >
                            <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            <a
                              href={`tel:+91${phone}`}
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                            >
                              {phone}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded break-all"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map - shown below offices on mobile, in left column on desktop */}
            <div className="lg:hidden">
              <OfficeLocationsMap />
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
              <ContactForm />
            </div>

            {/* Map - shown in right column on desktop */}
            <div className="hidden lg:block">
              <OfficeLocationsMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
