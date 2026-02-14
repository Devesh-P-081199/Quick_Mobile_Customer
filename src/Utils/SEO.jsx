import { Helmet } from "react-helmet-async";

const staticSEO = {
  canonical: "https://www.quickmobile.in/",
  robots: "index, follow",
  image: "https://www.quickmobile.in/assets/og-image.png",
  imageAlt: "QuickMobile - Buy & Sell Mobiles Online",
  imageTitle: "QuickMobile Marketplace",
  socialLinks: {
    facebook: "https://www.facebook.com/quickmobile",
    twitter: "https://twitter.com/quickmobile",
    instagram: "https://www.instagram.com/quickmobile",
  },
};

// 🔹 Fallback SEO
const fallbackSEO = {
  title: "QuickMobile - Buy & Sell Mobiles Online",
  description:
    "QuickMobile is your trusted marketplace to buy, sell, and upgrade smartphones at the best prices.",
};

const SEO = ({ seoData = {} }) => {
  //   ...fallbackSEO,
  //   ...seoData,
  //   ...staticSEO,

  const mergedSEO = {
    ...staticSEO, // base constants
    ...fallbackSEO, // fallback if backend is empty
    ...seoData,
  };
  const dynamicUrl = window.location.origin + window.location.pathname;

  return (
    <Helmet>
      {/* ---------- BASIC SEO ---------- */}
      <title>{mergedSEO.title}</title>
      <meta
        name="description"
        content={mergedSEO.description || fallbackSEO.description}
      />

      {/* ---------- CANONICAL & ROBOTS ---------- */}
      <link rel="canonical" href={dynamicUrl} />
      <meta name="robots" content={mergedSEO.robots} />

      {/* ---------- OPEN GRAPH ---------- */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={mergedSEO.title} />
      <meta property="og:description" content={mergedSEO.description} />
      <meta property="og:url" content={dynamicUrl} />
      <meta property="og:image" content={mergedSEO.image} />

      {/* ---------- TWITTER CARDS ---------- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={mergedSEO.title} />
      <meta name="twitter:description" content={mergedSEO.description} />
      <meta name="twitter:image" content={mergedSEO.image} />

      {/* ---------- IMAGE ALT & TITLE ---------- */}
      <meta name="image:alt" content={mergedSEO.imageAlt} />
      <meta name="image:title" content={mergedSEO.imageTitle} />

      {/* ---------- SOCIAL LINKS ---------- */}
      <link rel="me" href={mergedSEO.socialLinks.facebook} />
      <link rel="me" href={mergedSEO.socialLinks.twitter} />
      <link rel="me" href={mergedSEO.socialLinks.instagram} />

      {/* ---------- SCHEMA (JSON-LD) ---------- */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "QuickMobile",
          url: dynamicUrl,
          logo: mergedSEO.image,
          sameAs: Object.values(mergedSEO.socialLinks),
        })}
      </script>

      {/* ---------- GOOGLE ANALYTICS ---------- */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
      ></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </script>
    </Helmet>
  );
};

export default SEO;
