// Style
import "../../assets/css/pages/FeaturedProducts.css";

// Hooks
import { useRef } from "react";

// Data
import { generators } from "../../../constants";

// UI
import ProductCard from "../ui/ProductCard";

// Routing
import { Link } from "react-router-dom";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FeaturedProducts = () => {
  const featuredProductsRef = useRef();

  const featuredProducts = [
    generators.find((gen) => gen.slug === "pgs-1-50-f"), // PGS-1-50-F (Mid-range FAW)
    generators.find((gen) => gen.slug === "pgs-1-100-f"), // PGS-1-100-F (Large FAW)
    generators.find((gen) => gen.slug === "pgs-1-150-c"), // PGS-1-150-C (Cummins)
    generators.find((gen) => gen.slug === "pgs-1-200-f"), // PGS-1-200-F (Flagship FAW)
  ];

  useGSAP(() => {
    const productCards = gsap.utils.toArray(
      featuredProductsRef.current.children
    );

    productCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          ease: "expo.out",
        }
      );
    });

    const featuredProductTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#featured-products",
        start: "top 60%",
      },
    });

    featuredProductTimeline
      .from(".fp-header", {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: "power2.inOut",
      })
      .from(
        ".fp-p",
        {
          opacity: 0,
          yPercent: 100,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
  });

  return (
    <section
      id="featured-products"
      className="min-h-dvh relative text-white py-30 overflow-hidden"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[var(--bg-dark)]/90" />

      {/* Content Wrapper */}
      <div className="relative z-10">
        <div className="section-container">
          <div className="text-center mb-20">
            {/* Main Heading: Industrial Style */}
            <h2 className="fp-header font-heading text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight leading-none">
              Featured{" "}
              <span className="text-[var(--accent-yellow)]">Products</span>
            </h2>

            {/* Subtext: Clean & Readable */}
            <p className="fp-p text-[var(--muted-gray)] text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our range of high-quality generators designed to keep your
              world powered — anytime, anywhere.
            </p>
          </div>

          <div
            ref={featuredProductsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch"
          >
            {featuredProducts.map((featuredProduct) => (
              <ProductCard
                key={featuredProduct.slug}
                product={featuredProduct}
              />
            ))}
          </div>

          <div className="mt-20 flex-center">
            <Link
              to="/products"
              // Updated Button Style: Oswald Font, Uppercase, Tracking
              className="bg-[#145d77] border border-[var(--panel-blue)] hover:border-[#1a6d8a] px-8 py-4 rounded-lg hover:bg-[var(--accent-yellow)] hover:text-black transition-all duration-300 font-heading font-bold uppercase tracking-wider text-sm md:text-base"
            >
              View all products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
