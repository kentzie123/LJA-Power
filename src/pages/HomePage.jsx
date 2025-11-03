// Components
import FeaturedProducts from "../components/layout/FeaturedProducts";
import Hero from "../components/layout/Hero";
import WhyChooseLJA from "../components/layout/WhyChooseLJA";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <WhyChooseLJA />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
