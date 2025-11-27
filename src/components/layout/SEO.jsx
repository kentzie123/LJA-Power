// src/components/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, url, image, type = "website" }) => {
  const siteName = "LJA Power Limited Co.";
  const logoUrl = "https://lja-power.com/images/lja-logo.png";

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || ""} />
      <link rel="canonical" href={url || "https://lja-power.com"} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || ""} />
      <meta property="og:image" content={image || logoUrl} />
      <meta property="og:url" content={url || "https://lja-power.com"} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || ""} />
      <meta name="twitter:image" content={image || logoUrl} />

      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteName,
          url: "https://lja-power.com",
          logo: logoUrl,
          sameAs: [
            "https://www.facebook.com/profile.php?id=61572436091637",
            "https://www.facebook.com/marc88fyi",
            "https://www.facebook.com/profile.php?id=61576825362962",
          ],
          description:
            "LJA Power Limited Co. is a trusted provider of reliable and efficient energy solutions for homes, businesses, and industries.",
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
