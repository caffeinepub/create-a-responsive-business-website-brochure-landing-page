import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, FileText, Calculator, TrendingUp, Building2 } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Loan Consultancy Services',
    subcategories: [
      'Home Loans',
      'Mortgage Loans',
      'Commercial Loans',
      'Education Loan',
      'Business Loans',
      'Vehicle Loan',
      'Property Loan',
      'Gold Loan',
      'Personal Loan',
    ],
  },
  {
    icon: FileText,
    title: 'Other Services',
    subcategories: [
      'PAN New & Correction',
      'Passport Assistance',
      'Shop & Establishment',
      'Trade License',
      'Fire Licence Registration',
      'Foods & Drugs License',
      'Digital Signature Class 3',
      'Goa Online Services',
    ],
  },
  {
    icon: Calculator,
    title: 'Tax Consultant',
    subcategories: [
      'Income Tax Returns',
      'GST Registration/Returns',
      'E-TDS/TCS Registration/Returns',
      'ESIC Registration/Returns',
      'EPFO Registration/Returns',
      'VAT Registration/Returns',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Investment Advisory',
    subcategories: [
      'Life Insurance',
      'Health Insurance',
      'Vehicle Insurance',
      'Mutual Fund',
      'ELSS/SIP',
      'National Pension Scheme',
      'Estate Creation',
      'Wealth Creation',
      'Tax & Financial Planning',
      'Government Bond',
      'IPO & Demat Account',
    ],
  },
  {
    icon: Building2,
    title: 'Property Consultancy',
    subcategories: [
      'Sale Deed',
      'Title Search Report',
      'Property Valuation Report',
      'Mutation/Partition Conversion',
      'Sanad',
      'Architect Drawing & Planning',
      'TCP Technical Clearance (Plan Approved)',
      'TCP Completion Order',
      'Occupancy Certificate',
      'Panchayat & Municipal',
      'Health NOC (Temporary & Permanent)',
      'Water & Electricity Connection',
      'RERA Registrations',
    ],
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
            Comprehensive consulting solutions tailored to your needs. We provide expert guidance across loans, tax, investment, property, and documentation services.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="border-border/50 hover:border-border transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.subcategories.map((subcategory, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{subcategory}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
