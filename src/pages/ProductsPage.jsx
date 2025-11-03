// Helmet
import { Helmet } from "react-helmet";

// Styling
import "../assets/css/pages/ProductsPage.css";

// Routing
import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";

// Icons
import { Search, ChevronRight } from "lucide-react";

// UI
import ProductCard from "../components/ui/ProductCard";

// Data
import { generators } from "../../constants";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [limit, setLimit] = useState(8);

  //---------------- FOR SEO ---------------------
  const totalGenerators = generators.length;
  const fawCount = generators.filter((g) => g.category === "faw-diesel").length;
  const cumminsCount = generators.filter(
    (g) => g.category === "cummins-diesel"
  ).length;

  // Get power range
  const powerRange = generators.reduce(
    (range, generator) => {
      const power = parseInt(generator.standbyPower);
      if (power < range.min) range.min = power;
      if (power > range.max) range.max = power;
      return range;
    },
    { min: Infinity, max: -Infinity }
  );
  //--------------------------------------------------

  const categories = [
    { id: "all", name: "All Generators" },
    { id: "faw-diesel", name: "FAW Diesel" },
    { id: "cummins-diesel", name: "Cummins Diesel" },
  ];

  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "power-asc", label: "Power (Low to High)" },
    { value: "power-desc", label: "Power (High to Low)" },
  ];

  // Filter generators based on category and search term
  const filteredGenerators = generators.filter((generator) => {
    const matchesCategory =
      selectedCategory === "all" || generator.category === selectedCategory;

    const matchesSearch =
      generator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      generator.standbyPower.toLowerCase().includes(searchTerm.toLowerCase()) ||
      generator.engine.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort filtered generators
  const sortedGenerators = [...filteredGenerators].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "power-asc":
        return parseFloat(a.standbyPower) - parseFloat(b.standbyPower);
      case "power-desc":
        return parseFloat(b.standbyPower) - parseFloat(a.standbyPower);
      default:
        return 0;
    }
  });

  const loadMoreProducts = () => {
    setLimit((prev) => prev + 8);
  };

  useGSAP(() => {
    const productHeroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#product-page-hero",
        start: "top center",
      },
    });

    productHeroTimeline
      .from(".product-title", {
        xPercent: -50,
        opacity: 0,
        ease: "power2.inOut",
        duration: 1,
      })
      .from(
        ".product-p",
        {
          xPercent: 50,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        "-=0.5"
      )
      .from(
        ".product-route",
        {
          yPercent: 100,
          opacity: 0,
          duration: 1,
          ease: "back.inOut",
        },
        "-=0.5"
      );
  });

  return (
    <div className="min-h-screen bg-[#0c2430] pt-15">
      {/* Dynamic Meta Tags for Products Page */}
      <Helmet>
        <title>
          {`Diesel Generators ${powerRange.min}-${powerRange.max}kVA | LJA Power Philippines`}
        </title>
        <meta
          name="description"
          content={`Browse ${totalGenerators} diesel generators (${powerRange.min}-${powerRange.max}kVA) from FAW & Cummins. Silent power solutions for homes, businesses & industries across Philippines. Free delivery & installation.`}
        />
        <meta
          name="keywords"
          content={`diesel generators ${powerRange.min}kVA to ${powerRange.max}kVA, FAW generators, Cummins generators, silent generators Philippines, backup power solutions, industrial generators, commercial generators`}
        />
        <link rel="canonical" href="https://lja-power.com/products" />

        {/* Open Graph for Products */}
        <meta
          property="og:title"
          content={`${powerRange.min}-${powerRange.max}kVA Diesel Generators | LJA Power`}
        />
        <meta
          property="og:description"
          content={`${totalGenerators} FAW & Cummins diesel generators available. ${fawCount} FAW models, ${cumminsCount} Cummins models. Power solutions for entire Philippines.`}
        />
        <meta
          property="og:image"
          content="https://lja-power.com/images/lja-logo.png"
        />
        <meta property="og:url" content="https://lja-power.com/products" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta
          name="twitter:title"
          content="Diesel Generators Catalog | LJA Power"
        />
        <meta
          name="twitter:description"
          content={`Browse ${totalGenerators} diesel generators from ${powerRange.min}kVA to ${powerRange.max}kVA. FAW & Cummins power solutions for Philippines.`}
        />
        <meta
          name="twitter:image"
          content="https://lja-power.com/images/lja-logo.png"
        />

        {/* Structured Data for Product Collection */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Diesel Generator Products",
        "description": "Complete catalog of FAW and Cummins diesel generators from ${powerRange.min}kVA to ${powerRange.max}kVA for residential, commercial, and industrial applications in the Philippines",
        "url": "https://lja-power.com/products",
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": ${totalGenerators},
          "itemListOrder": "https://schema.org/ItemListOrderAscending",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "FAW Diesel Generators",
              "description": "${fawCount} models of FAW diesel generators from ${powerRange.min}kVA to ${powerRange.max}kVA",
              "url": "https://lja-power.com/products?category=faw-diesel"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Cummins Diesel Generators", 
              "description": "${cumminsCount} models of Cummins diesel generators for various power requirements",
              "url": "https://lja-power.com/products?category=cummins-diesel"
            }
          ]
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://lja-power.com"
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "Products",
              "item": "https://lja-power.com/products"
            }
          ]
        }
      }
    `}
        </script>

        {/* Additional SEO Meta Tags */}
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta property="product:brand" content="LJA Power Limited Co." />
        <meta property="product:availability" content="in stock" />
        <meta property="product:condition" content="new" />
        <meta property="product:price:currency" content="PHP" />
        <meta
          property="product:retailer_item_id"
          content="generators-catalog"
        />
      </Helmet>

      <section
        id="product-page-hero"
        className="relative h-80 overflow-hidden flex-center"
      >
        <div className="absolute top-0 inset-0 bg-[var(--bg-dark)]/80" />

        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <h1 className="product-title text-5xl md:text-7xl font-bold text-[var(--accent-yellow)]">
            <span className="text-white">Our</span> Products
          </h1>
          <p className="product-p text-[var(--muted-gray)] max-w-2xl mx-auto">
            Beyond selling generators, LJA Power provides full-service energy
            solutions to keep your systems running smoothly.
          </p>

          <div className="product-route flex-center text-white">
            <ul className="flex gap-2">
              <li className="hover:link hover:text-[var(--accent-yellow)] cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <ChevronRight className="my-auto text-[var(--accent-yellow)]" />
              <li>Product</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Header with Search */}
      {/* <section className="bg-[#0f4b5a] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Generator Sets</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a9b6bd] h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search generators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#145d77] border border-[#1a6d8a] rounded-lg focus:ring-2 focus:ring-[#f5ec19] focus:border-transparent text-white placeholder-[#a9b6bd] w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters and Sort */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-[#f5ec19] text-[#0c2430]"
                    : "bg-[#145d77] text-[#a9b6bd] border border-[#1a6d8a] hover:bg-[#1a6d8a]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select w-50 bg-[#145d77] border border-[#1a6d8a] text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f5ec19] focus:border-transparent mt-5 md:mt-0"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#a9b6bd]">
            Showing {sortedGenerators.length} of {generators.length} generators
            {selectedCategory !== "all" &&
              ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid */}
        {sortedGenerators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedGenerators.slice(0, limit).map((generator) => (
              <ProductCard key={generator.slug} product={generator} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#a9b6bd] text-lg">
              No generators found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
                setSortBy("name-asc");
              }}
              className="mt-4 bg-[#145d77] text-[#a9b6bd] border border-[#1a6d8a] px-6 py-2 rounded-lg hover:bg-[#1a6d8a] transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More - You can implement pagination later if needed */}
        {limit < generators.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMoreProducts}
              className="bg-[#145d77] text-[#a9b6bd] border border-[#1a6d8a] px-6 py-3 rounded-lg hover:bg-[#1a6d8a] transition-colors font-medium"
            >
              Load More Generators
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;
