import { useLayoutEffect } from "react";

// For routing
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Common
import ScrollToTop from "./components/common/ScrollToTop";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage";
import Page404 from "./pages/Page404";

// Toast Container
import { ToastContainer } from "react-toastify";

// GSAP
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

function App() {
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      smoothTouch: 0.1,
      effects: true,
    });

    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper">
      <Navbar />
      <main id="smooth-content">
        <ToastContainer />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        <Footer />
      </main>
    </div>
  );
}

export default App;
