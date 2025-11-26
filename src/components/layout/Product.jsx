// Styling
import "../assets/css/Products.css";

// Lucide Icons
import { BatteryCharging, Zap, ShieldCheck, Filter, X } from "lucide-react";

//UI
import Button from "../ui/Button";

// Hooks
import { useState, useRef, useEffect } from "react";

// GSAP
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

const Product = () => {
  const [limit, setLimit] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    connectionMode: "",
    powerRange: "",
    engineBrand: "",
    aspiration: "",
    cylinders: "",
    controlSystem: "",
    technology: "",
  });
  const productRef = useRef();

  // Sample products data - replace with your actual data
  const products = [
    // Your product objects here...
  ];

  // Filter functions
  const filteredProducts = products.filter((product) => {
    return (
      (!filters.category || product.category === filters.category) &&
      (!filters.connectionMode ||
        product.connectionMode === filters.connectionMode) &&
      (!filters.powerRange ||
        checkPowerRange(product.standbyPower, filters.powerRange)) &&
      (!filters.engineBrand || product.engine.includes(filters.engineBrand)) &&
      (!filters.aspiration ||
        product.engineSpecs.aspiration === filters.aspiration) &&
      (!filters.cylinders ||
        product.engineSpecs.cylinders === filters.cylinders) &&
      (!filters.controlSystem ||
        checkControlSystem(product.features, filters.controlSystem)) &&
      (!filters.technology ||
        product.alternatorSpecs.technology === filters.technology)
    );
  });

  const checkPowerRange = (power, range) => {
    const powerValue = parseFloat(power.split(" ")[0]);
    switch (range) {
      case "0-50":
        return powerValue <= 50;
      case "51-100":
        return powerValue > 50 && powerValue <= 100;
      case "101-200":
        return powerValue > 100 && powerValue <= 200;
      case "201+":
        return powerValue > 200;
      default:
        return true;
    }
  };

  const checkControlSystem = (features, system) => {
    return features.some((feature) =>
      feature.toLowerCase().includes(system.toLowerCase())
    );
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      connectionMode: "",
      powerRange: "",
      engineBrand: "",
      aspiration: "",
      cylinders: "",
      controlSystem: "",
      technology: "",
    });
  };

  const viewMore = () => {
    setLimit((prev) => prev + 4);
  };

  // Get unique values for filter options
  const categories = [...new Set(products.map((p) => p.category))];
  const connectionModes = [...new Set(products.map((p) => p.connectionMode))];
  const engineBrands = [
    ...new Set(products.map((p) => p.engine.split(" ")[0])),
  ];
  const aspirations = [
    ...new Set(products.map((p) => p.engineSpecs.aspiration)),
  ];
  const cylinders = [...new Set(products.map((p) => p.engineSpecs.cylinders))];
  const technologies = [
    ...new Set(products.map((p) => p.alternatorSpecs.technology)),
  ];

  useGSAP(() => {
    const productCards = gsap.utils.toArray(productRef.current?.children || []);

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
            Our <span className="text-[var(--accent-yellow)]">Products</span>
          </h2>
          <p className="product-p text-[var(--muted-gray)] max-w-2xl mx-auto">
            Explore our range of high-quality generators designed to keep your
            world powered — anytime, anywhere.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters{" "}
              {Object.values(filters).filter(Boolean).length > 0 &&
                `(${Object.values(filters).filter(Boolean).length})`}
            </Button>

            {Object.values(filters).some(Boolean) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="bg-[var(--dark-blue)] p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[var(--card-blue)] border border-[var(--muted-gray)]"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Connection Mode Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Connection
                </label>
                <select
                  value={filters.connectionMode}
                  onChange={(e) =>
                    setFilters({ ...filters, connectionMode: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[var(--card-blue)] border border-[var(--muted-gray)]"
                >
                  <option value="">All Connections</option>
                  {connectionModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>

              {/* Power Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Power Range (kVA)
                </label>
                <select
                  value={filters.powerRange}
                  onChange={(e) =>
                    setFilters({ ...filters, powerRange: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[var(--card-blue)] border border-[var(--muted-gray)]"
                >
                  <option value="">All Power Ranges</option>
                  <option value="0-50">0-50 kVA</option>
                  <option value="51-100">51-100 kVA</option>
                  <option value="101-200">101-200 kVA</option>
                  <option value="201+">201+ kVA</option>
                </select>
              </div>

              {/* Engine Brand Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Engine Brand
                </label>
                <select
                  value={filters.engineBrand}
                  onChange={(e) =>
                    setFilters({ ...filters, engineBrand: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[var(--card-blue)] border border-[var(--muted-gray)]"
                >
                  <option value="">All Brands</option>
                  {engineBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional filters can be added here */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Aspiration
                </label>
                <select
                  value={filters.aspiration}
                  onChange={(e) =>
                    setFilters({ ...filters, aspiration: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[var(--card-blue)] border border-[var(--muted-gray)]"
                >
                  <option value="">All Types</option>
                  {aspirations.map((asp) => (
                    <option key={asp} value={asp}>
                      {asp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Technology
                </label>
                <select
                  value={filters.technology}
                  onChange={(e) =>
                    setFilters({ ...filters, technology: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[var(--card-blue)] border border-[var(--muted-gray)]"
                >
                  <option value="">All Technologies</option>
                  {technologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[var(--muted-gray)]">
            Showing {filteredProducts.slice(0, limit).length} of{" "}
            {filteredProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div
          ref={productRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 items-stretch"
        >
          {filteredProducts.slice(0, limit).map((prod, i) => (
            <div
              key={prod.slug || i}
              className="product-card group overflow-hidden flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  className="group-hover:scale-110 transition-transform duration-500 w-full h-full object-cover"
                  src={prod.images?.[0] || "/images/abt4.webp"}
                  alt={prod.name}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_#0c2430_100%)]" />
              </div>

              <div className="card-content p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{prod.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {prod.standbyPower} | {prod.engine}
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-center gap-2">
                      <BatteryCharging className="w-4 h-4" />
                      <div className="text-sm">{prod.connectionMode}</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <div className="text-sm">{prod.standbyPower}</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <div className="text-sm">
                        {prod.engineSpecs?.cylinders}
                      </div>
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

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--muted-gray)] text-lg">
              No products found matching your filters.
            </p>
            <Button onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}

        {/* View More Button */}
        <div className="flex-center mt-10">
          {limit < filteredProducts.length && (
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
