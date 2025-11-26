import { useEffect } from "react";

// Routing
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// UI
import ChatFloatingButton from "./components/ui/ChatFloatingButton";

// Common
import ScrollToTop from "./components/common/ScrollToTop";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsAndTestimonies from "./pages/ProjectsAndTestimonies";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import BranchContactPage from "./pages/BranchContactPage";
import Page404 from "./pages/Page404";

// Toast
import { ToastContainer } from "react-toastify";

// Lenis
import Lenis from "@studio-freight/lenis";

// GSAP
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  useEffect(() => {
    const lenis = new Lenis(
      {
        duration: 1.2,
        smooth: true,
        smoothTouch: false,
      },
      []
    );

    // Make Lenis globally accessible for ScrollToTop
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      // Clean up global reference
      window.lenis = null;
    };
  }, []);

  return (
    <div id="app-wrapper">
      <Navbar />
      <main>
        <ScrollToTop />
        <ToastContainer />
        <ChatFloatingButton />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsAndTestimonies />} />
          <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
          <Route path="/branches/:branchSlug" element={<BranchContactPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        <Footer />
      </main>
    </div>
  );
}

export default App;
