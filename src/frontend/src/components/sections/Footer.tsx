import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';

const socialLinks = [
  { icon: SiFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: SiX, href: 'https://x.com', label: 'X (Twitter)' },
  { icon: SiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: SiInstagram, href: 'https://instagram.com', label: 'Instagram' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'unknown-app';

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/assets/generated/business-logo.dim_512x512.png" 
                alt="GURU & ASSOCIATES SERVICES PRIVATE LIMITED" 
                className="h-10 w-10"
              />
              <span className="text-xl font-bold">GURU & ASSOCIATES SERVICES PRIVATE LIMITED</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Expert tax, financial, and property consulting services in Goa.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#about" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#reviews" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#reviews')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Reviews
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="mailto:guru.associates36@gmail.com"
                  className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                >
                  guru.associates36@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+918830194354"
                  className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                >
                  8830194354
                </a>
              </li>
              <li>Ponda, Goa</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} GURU & ASSOCIATES SERVICES PRIVATE LIMITED. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
