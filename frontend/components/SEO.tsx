import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import type { Language } from "../lib/i18n";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    author: string;
    tags: string[];
  };
}

export function SEO({ 
  title = "Dr. Ahmed Sultan - ENT Specialist & Surgeon",
  description = "Expert ENT care in Dubai. Specializing in ear, nose, and throat conditions with over 15 years of experience.",
  image = "/images/doctor-profile.jpg",
  type = "website",
  article
}: SEOProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const alternateLanguage: Language = language === "en" ? "ar" : "en";
  const canonicalUrl = typeof window !== "undefined" ? window.location.href : "";
  const alternateUrl = canonicalUrl.replace(`/${language}/`, `/${alternateLanguage}/`);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "MedicalBusiness",
    name: "Dr. Ahmed Sultan ENT Clinic",
    url: canonicalUrl,
    logo: "/images/logo.png",
    image,
    description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Medical Center Drive",
      addressLocality: "Dubai",
      addressCountry: "AE"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.2048",
      longitude: "55.2708"
    },
    telephone: "+971 4 123 4567",
    priceRange: "AED",
    medicalSpecialty: [
      "Otolaryngology",
      "ENT Surgery",
      "Sleep Medicine"
    ],
    availableLanguage: ["English", "Arabic"],
    ...(type === "article" && article ? {
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime,
      author: {
        "@type": "Person",
        name: article.author
      },
      keywords: article.tags.join(", ")
    } : {})
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* OpenGraph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Dr. Ahmed Sultan ENT Clinic" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Article-specific meta tags */}
      {type === "article" && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          {article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Language alternates */}
      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="alternate"
        href={alternateUrl}
        hrefLang={alternateLanguage}
      />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
