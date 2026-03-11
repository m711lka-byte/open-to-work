import { resumeData } from "@/lib/data";

export function JsonLdProfile() {
  const { basics, skills } = resumeData;
  const allSkills = skills.flatMap(s => s.keywords.map(kw => ({
    "@type": "DefinedTerm",
    "name": kw
  })));

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": basics.name,
    "jobTitle": basics.label,
    "email": `mailto:${basics.email}`,
    "telephone": basics.phone,
    "url": basics.url,
    "image": basics.image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": basics.location.city,
      "addressRegion": basics.location.region,
      "postalCode": basics.location.postalCode,
      "addressCountry": basics.location.countryCode
    },
    "sameAs": basics.profiles.map(p => p.url),
    "knowsAbout": allSkills,
    "isAcceptingNewClients": resumeData.meta.status.openToWork, // Proxy for openToWork
    "description": basics.summary
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
    />
  );
}
