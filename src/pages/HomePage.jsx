// SEO
import SEO from "../components/layout/SEO";

// Components
import FeaturedProducts from "../components/layout/FeaturedProducts";
import Hero from "../components/layout/Hero";
import WhyChooseLJA from "../components/layout/WhyChooseLJA";
import About from "../components/layout/About";
import ServicesHomePage from "../components/layout/ServicesHomePage";
import BottomContentHomePage from "../components/layout/BottomContentHomePage";

const HomePage = () => {
  return (
    <div>
      <SEO
        title="Diesel Generators & ATS Services"
        description="LJA Power Limited Co.: Your trusted diesel generator supplier in Philippines. Expert ATS installation, preventive maintenance & complete power solutions. 24/7 service."
        url="https://lja-power.com/"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero1.webp"
        fetchPriority="high"
      />
      <Hero />
      <About />
      <WhyChooseLJA />
      <FeaturedProducts />
      <ServicesHomePage />
      <BottomContentHomePage />
    </div>
  );
};

export default HomePage;
