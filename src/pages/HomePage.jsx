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
          LJA Power Limited Co. | Diesel Generators, ATS Installation &
          Maintenance Philippines
        </title>

        <meta
          name="description"
          content="LJA Power Limited Co. provides diesel generators, preventive maintenance, ATS installation, troubleshooting, and complete power solutions across the Philippines."
        />

        <meta
          name="keywords"
          content="diesel generators Philippines, generator supplier Cebu, generator maintenance, ATS installation, genset services, generator troubleshooting, LJA Power"
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://lja-power.com/" />

        {/* Social SEO */}
        <meta
          property="og:title"
          content="LJA Power Limited Co. | Power Solutions Philippines"
        />
        <meta
          property="og:description"
          content="Reliable diesel generators and complete power services."
        />
        <meta
          property="og:image"
          content="https://lja-power.com/images/lja-logo.png"
        />
        <meta property="og:url" content="https://lja-power.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "LJA Power Limited Co.",
        "url": "https://lja-power.com",
        "logo": "https://lja-power.com/images/lja-logo.png",
        "description": "Supplier of diesel generators and provider of complete power generation services across the Philippines.",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61572436091637",
          "https://www.facebook.com/marc88fyi",
          "https://www.facebook.com/profile.php?id=61576825362962"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+63 915 689 2189",
          "contactType": "customer service",
          "areaServed": "PH"
        }
      },
      {
        "@type": "WebSite",
        "name": "LJA Power Limited Co.",
        "url": "https://lja-power.com"
      },
      {
        "@type": "Service",
        "name": "Generator Services",
        "provider": {
          "@type": "Organization",
          "name": "LJA Power Limited Co."
        },
        "serviceType": [
          "Preventive Maintenance",
          "Automatic Transfer Switch (ATS) Installation",
          "Troubleshooting & Diagnostics",
          "Delivery & Installation",
          "Controller Conversion"
        ],
        "areaServed": "Philippines"
      }
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
