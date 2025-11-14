// Helmet
import { Helmet } from "react-helmet";

// Styling
import "../assets/css/pages/ProductsPage.css";

// Components
import PageNavigationHeader from "../components/layout/PageNavigationHeader";

// Routing
import { Link } from "react-router-dom";

// Hooks
import { useState, useMemo } from "react";

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
      const power = parseInt(generator.standbyPower || "0", 10);
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
  const filteredGenerators = useMemo(() => {
    return generators.filter((g) => {
      const matchesCategory =
        selectedCategory === "all" || g.category === selectedCategory;
      const matchesSearch = [g.name, g.standbyPower, g.engine].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesCategory && matchesSearch;
    });
  }, [generators, selectedCategory, searchTerm]);

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
      .from(".product-filter", {
        delay: 1.7,
        opacity: 0,
        xPercent: -100,
        ease: "power1.inOut",
      })
      .from(
        "#product-sort",
        {
          opacity: 0,
          xPercent: 100,
          ease: "power1.inOut",
        },
        "-=0.5"
      );
  });

  return (
    <>
      <Helmet>
        {/* Page Title & Meta Description */}
        <title>
          {`Diesel Generators ${powerRange.min}-${powerRange.max}kVA | LJA Power Limited Co.`}
        </title>
        <meta
          name="description"
          content={`Browse ${totalGenerators} high-quality diesel generators (${powerRange.min}-${powerRange.max}kVA) from FAW & Cummins. Reliable power solutions for homes, businesses, and industries across the Philippines.`}
        />
        <meta
          name="keywords"
          content={`diesel generators, FAW generators, Cummins generators, silent generators Philippines, backup power, commercial generators, industrial generators`}
        />
        <link rel="canonical" href="https://lja-power.com/products" />

        {/* Open Graph / Social Sharing */}
        <meta
          property="og:title"
          content={`Diesel Generators ${powerRange.min}-${powerRange.max}kVA | LJA Power Limited Co.`}
        />
        <meta
          property="og:description"
          content={`Explore ${totalGenerators} diesel generators from ${powerRange.min}-${powerRange.max}kVA. Silent and efficient power solutions for every need.`}
        />
        <meta
          property="og:image"
          content="https://lja-power.com/images/abt1.webp"
        />
        <meta
          property="og:image:alt"
          content="Diesel Generators by LJA Power Limited Co."
        />
        <meta property="og:url" content="https://lja-power.com/products" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LJA Power Limited Co." />
        <meta property="og:locale" content="en_PH" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Diesel Generators ${powerRange.min}-${powerRange.max}kVA | LJA Power Limited Co.`}
        />
        <meta
          name="twitter:description"
          content={`Discover our range of silent diesel generators (${powerRange.min}-${powerRange.max}kVA). Perfect for residential, commercial, and industrial use.`}
        />
        <meta
          name="twitter:image"
          content="https://lja-power.com/images/abt1.webp"
        />

        {/* Robots */}
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "LJA Power Limited Co. Generator Products",
            description:
              "Explore LJA Power’s complete line of diesel generators for commercial and industrial use.",
            url: "https://lja-power.com/products",
            isPartOf: {
              "@type": "WebSite",
              name: "LJA Power Limited Co.",
              url: "https://lja-power.com",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#0c2430]">
        <PageNavigationHeader
          h1="Our"
          h1Yellow="Products"
          p="Beyond selling generators, LJA Power provides full-service energy solutions to keep your systems running smoothly."
          id="product-page-hero"
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Products" }]}
        />

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filters and Sort */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="product-filter flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-[#f5ec19] text-[#0c2430]"
                      : "bg-[#145d77] text-white border border-[#1a6d8a] hover:bg-[#1a6d8a]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <label htmlFor="product-sort" className="sr-only">
              Select product category
            </label>
            <select
              id="product-sort"
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
          <div className="flex justify-between items-center mb-6">
            <p className="text-[#a9b6bd]">
              Showing {Math.min(sortedGenerators.length, limit)} of{" "}
              {generators.length} generators
              {selectedCategory !== "all" &&
                ` in ${
                  categories.find((c) => c.id === selectedCategory)?.name
                }`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>

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

          {/* Products Grid */}
          {sortedGenerators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
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
                className="bg-[#145d77] text-white cursor-pointer border border-[#1a6d8a] px-6 py-3 rounded-lg hover:bg-[#1a6d8a] transition-colors font-medium"
              >
                Load More Generators
              </button>
            </div>
          )}

          <div className="bg-[var(--card-blue)] flex-center flex-col gap-6 py-12 p-4 mx-2 md:mx-6 my-12 rounded-md">
            <div className="text-2xl font-bold text-white text-center">
              Not Sure Which Generator You Need?
            </div>
            <p className="text-center text-[var(--muted-gray)] text-balance">
              Our power generation experts are ready to help you find the
              perfect solution for your specific requirements. We'll assess your
              power needs and recommend the ideal generator configuration.
            </p>

            <Link to="/contacts" className="btn-yellow">
              Get Expert Consultation
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductsPage;
