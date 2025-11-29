import { useEffect } from "react"; // Removed: lazy, Suspense

// Routing
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// UI/Common
import ChatFloatingButton from "./components/ui/ChatFloatingButton";
import ScrollToTop from "./components/common/ScrollToTop";
import { ToastContainer } from "react-toastify";

// Libraries
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

// 👇 STATIC IMPORTS: Code for all pages loads immediately on startup
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage";
import ServicesPage from "./pages/ServicesPage";
import OurWorksPage from "./pages/OurWorksPage";
import OurWorkDetailsPage from "./pages/OurWorkDetailsPage";
import BranchContactPage from "./pages/BranchContactPage";
import Page404 from "./pages/Page404";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  // ... (Lenis setup remains the same) ...
  useEffect(() => {
    const lenis = new Lenis(
      {
        duration: 1.2,
        smooth: true,
        smoothTouch: false,
      },
      []
    );

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="min-h-screen" id="app-wrapper">
      <Navbar />
      <main>
        <ScrollToTop />
        <ToastContainer />
        <ChatFloatingButton />

        {/* 🚀 REMOVED SUSPENSE WRAPPER */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/services" element={<ServicesPage />} />

          {/* Projects/Works Routes */}
          <Route path="/our-works" element={<OurWorksPage />} />
          <Route path="/our-works/:slug" element={<OurWorkDetailsPage />} />

          <Route path="/branches/:branchSlug" element={<BranchContactPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        <Footer />
      </main>
    </div>
  );
}

export default App;
