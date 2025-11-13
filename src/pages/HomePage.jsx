import { Helmet } from "react-helmet";

// Components
import FeaturedProducts from "../components/layout/FeaturedProducts";
import Hero from "../components/layout/Hero";
import WhyChooseLJA from "../components/layout/WhyChooseLJA";
import About from "../components/layout/About";
import ServicesHomePage from "../components/layout/ServicesHomePage";
import TestimoniesHomePage from "../components/layout/TestimoniesHomePage";
import BottomContentHomePage from "../components/layout/BottomContentHomePage";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>
          LJA Power Limited Co. | Reliable Diesel Generators & Energy Solutions
        </title>

        <meta
          name="description"
          content="LJA Power Limited Co. provides reliable diesel generators and energy solutions across the Philippines. Powering homes, businesses, and industries nationwide."
        />
        <meta
          name="keywords"
          content="diesel generators, power solutions, energy systems, generator supplier Philippines, LJA Power, power equipment, generator maintenance"
        />
        <meta name="author" content="LJA Power Limited Co." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://lja-power.com/" />

        {/* ✅ Open Graph (for social sharing) */}
        <meta
          property="og:title"
          content="LJA Power Limited Co. | Reliable Diesel Generators & Energy Solutions"
        />
        <meta
          property="og:description"
          content="Reliable Diesel Generators & Energy Solutions Across the Philippines."
        />
        <meta
          property="og:image"
          content="https://lja-power.com/images/lja-logo.png"
        />
        <meta property="og:url" content="https://lja-power.com/" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LJA Power Limited Co." />
        <meta
          name="twitter:description"
          content="Reliable Diesel Generators & Energy Solutions Across the Philippines."
        />
        <meta
          name="twitter:image"
          content="https://lja-power.com/images/lja-logo.png"
        />

        {/* ✅ Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LJA Power Limited Co.",
            "url": "https://lja-power.com/",
            "logo": "https://lja-power.com/images/lja-logo.png",
            "description": "LJA Power Limited Co. provides reliable diesel generators and energy solutions across the Philippines.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Sayre Hwy, Malaybalay City",
              "addressLocality": "Malaybalay City",
              "addressRegion": "Bukidnon",
              "addressCountry": "PH"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+63 915 749 5102",
              "contactType": "Customer Service",
              "areaServed": "PH"
            },
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61572436091637",
              "https://maps.app.goo.gl/uTQVY2m7NyvnGoiA6"
            ]
          }
        `}</script>
      </Helmet>

      <Hero />
      <About />
      <WhyChooseLJA />
      <FeaturedProducts />
      <ServicesHomePage />
      <TestimoniesHomePage />
      <BottomContentHomePage />
    </div>
  );
};

export default HomePage;
