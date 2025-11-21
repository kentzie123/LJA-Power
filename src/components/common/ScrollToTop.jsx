import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      // Use Lenis if available for smooth scroll websites
      if (window.lenis && typeof window.lenis.scrollTo === "function") {
        // Simple immediate scroll to top with Lenis
        window.lenis.scrollTo(0, {
          immediate: true, // This is the key parameter
        });
      } else {
        // Fallback to regular scroll
        window.scrollTo(0, 0);
      }
    };

    // Scroll immediately without timeout
    scrollToTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
