// Components
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Product from "./components/Product";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// GSAP
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Product />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
