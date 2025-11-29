const SEO = ({ title, description, url, image }) => {
  // Defaults
  const siteName = "LJA Power Limited Co.";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription =
    "Supplier of diesel generators and provider of complete power generation services across the Philippines.";
  const finalDescription = description || defaultDescription;
  const currentUrl = url || "https://lja-power.com";
  const shareImage = image || "https://lja-power.com/images/lja-logo.png";

  return (
    <>
      {/* 1. Standard Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={currentUrl} />

      {/* 2. Open Graph (Facebook / LinkedIn) */}
      {/* Note: og:site_name and og:type are already in index.html! */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={shareImage} />

      {/* 3. Twitter (Minimal Setup) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={shareImage} />
    </>
  );
};

export default SEO;
