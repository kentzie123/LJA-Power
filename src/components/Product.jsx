import { products } from "../../constants";

// Styling
import "../assets/css/Products.css";

// Lucide Icons
import { BatteryCharging, Zap, ShieldCheck } from "lucide-react";

//UI
import Button from "./ui/Button";
import ProductModal from "./ui/ProductModal";

// Hooks
import { useState, useRef } from "react";

// GSAP
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

const Product = () => {
  const [limit, setLimit] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productRef = useRef();

  const viewMore = () => {
    setLimit((prev) => prev + 4);
  };

  useGSAP(() => {
    const productCards = gsap.utils.toArray(productRef.current.children);

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
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          ease: "expo.out",
        }
      );
    });

    const productHeaderSplit = new SplitText(".product-header", {
      type: "words",
    });

    const productTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#products",
        start: "top center",
      },
    });

    productTimeline
      .from(productHeaderSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.2,
      })
      .from(
        ".product-p",
        {
          opacity: 0,
          duration: 0.5,
          yPercent: 100,
          ease: "expo.out",
        },
        "-=0.5"
      );
  });

  return (
    <section
      id="products"
      className="bg-[var(--card-blue)] text-[var(--white)] py-20 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="product-header text-5xl md:text-7xl font-bold mb-4">
            Our{" "}
            <span className="text-[var(--accent-yellow)]">Products</span>
          </h2>
          <p className="product-p text-[var(--muted-gray)] max-w-2xl mx-auto">
            Explore our range of high-quality generators designed to keep your
            world powered — anytime, anywhere.
          </p>
        </div>

        <div
          ref={productRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 items-stretch"
        >
          {products.slice(0, limit).map((prod, i) => (
            <div
              key={prod.id || i}
              className="product-card group overflow-hidden flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  className="group-hover:scale-110 transition-transform duration-500 w-full h-full object-cover"
                  src={"/images/abt4.webp"}
                  alt={prod.name}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_#0c2430_100%)]" />
              </div>

              <div className="card-content p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{prod.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {prod.specs}
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-center gap-2">
                      <BatteryCharging className="w-4 h-4" />
                      <div className="text-sm">{prod.features[0]}</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <div className="text-sm">{prod.features[1]}</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <div className="text-sm">{prod.features[2]}</div>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <Button
                    onClick={() => {
                      setShowModal(true);
                      setSelectedProduct(prod);
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-center mt-10">
          {limit < products.length && (
            <button onClick={viewMore} className="btn btn-warning text-white">
              View More
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <ProductModal
          setShowModal={setShowModal}
          selectedProduct={selectedProduct}
        />
      )}
    </section>
  );
};

export default Product;
