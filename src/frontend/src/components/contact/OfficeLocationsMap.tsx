import { MapPin, ExternalLink } from 'lucide-react';

// Office data with full addresses for Google Maps links
const offices = [
  {
    name: 'Head Office',
    location: 'Ponda',
    address: 'G-05, Aniruddh Plaza, Shantinagar Road, Nr. Corporation Bank, Ponda - Goa 403401',
    lat: 15.4018,
    lng: 74.0123,
  },
  {
    name: 'Branch Office',
    location: 'Marcel',
    address: 'FF2, First Floor Omkar Adonis Blue Plaza, Deulwada Marcel - Goa 403 107',
    lat: 15.4589,
    lng: 73.9456,
  },
];

export default function OfficeLocationsMap() {
  // Calculate the bounding box for both locations with padding
  const minLat = Math.min(...offices.map(o => o.lat)) - 0.05;
  const maxLat = Math.max(...offices.map(o => o.lat)) + 0.05;
  const minLng = Math.min(...offices.map(o => o.lng)) - 0.05;
  const maxLng = Math.max(...offices.map(o => o.lng)) + 0.05;
  
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;
  
  // OpenStreetMap static tile URL
  const zoom = 11;
  const mapWidth = 800;
  const mapHeight = 600;
  
  // Using OpenStreetMap tiles via static map service
  const staticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng},${minLat},${maxLng},${maxLat}&layer=mapnik`;
  
  // Convert lat/lng to pixel coordinates for SVG overlay
  const latToY = (lat: number) => {
    const latRange = maxLat - minLat;
    return ((maxLat - lat) / latRange) * 100;
  };
  
  const lngToX = (lng: number) => {
    const lngRange = maxLng - minLng;
    return ((lng - minLng) / lngRange) * 100;
  };
  
  const officePositions = offices.map(office => ({
    ...office,
    x: lngToX(office.lng),
    y: latToY(office.lat),
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Our Locations</h3>
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-border/50 bg-muted">
        {/* Map iframe */}
        <iframe
          title="Office Locations Map"
          src={staticMapUrl}
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
        />
        
        {/* SVG overlay for markers and connecting line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Connecting line */}
          <line
            x1={officePositions[0].x}
            y1={officePositions[0].y}
            x2={officePositions[1].x}
            y2={officePositions[1].y}
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            strokeDasharray="2,1"
            opacity="0.8"
          />
          
          {/* Markers */}
          {officePositions.map((office, index) => (
            <g key={office.name}>
              {/* Marker circle background */}
              <circle
                cx={office.x}
                cy={office.y}
                r="2"
                fill="hsl(var(--primary))"
                stroke="hsl(var(--background))"
                strokeWidth="0.3"
              />
              
              {/* Marker pulse effect */}
              <circle
                cx={office.x}
                cy={office.y}
                r="2.5"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.2"
                opacity="0.4"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="4"
                  dur="2s"
                  begin={`${index * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="2s"
                  begin={`${index * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>
        
        {/* Labels overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {officePositions.map((office) => (
            <div
              key={office.name}
              className="absolute transform -translate-x-1/2 -translate-y-full"
              style={{
                left: `${office.x}%`,
                top: `${office.y}%`,
              }}
            >
              <div className="mb-2 px-3 py-1.5 rounded-md bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  <div className="text-xs">
                    <div className="font-semibold text-foreground">{office.name}</div>
                    <div className="text-muted-foreground">{office.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>Office Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 border-t-2 border-dashed border-primary" />
          <span>Connection</span>
        </div>
      </div>

      {/* Google Maps Links */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {offices.map((office) => (
          <a
            key={office.name}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-border/50 bg-card hover:bg-accent hover:border-accent-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm font-medium"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span>Open {office.name} in Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
        ))}
      </div>
    </div>
  );
}
