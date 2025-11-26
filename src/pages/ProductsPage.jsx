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
import { Search, ChevronRight, Filter, X } from "lucide-react";

// UI
import ProductCard from "../components/ui/ProductCard";

// Data
import { generators } from "../../constants";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [limit, setLimit] = useState(8);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    connectionMode: [],
    aspiration: [],
    cylinders: [],
    controlSystem: [],
    alternatorTech: [],
    voltage: [],
    powerRange: { min: "", max: "" },
  });

  //---------------- FOR SEO ---------------------
  const totalGenerators = generators.length;
  const fawCount = generators.filter((g) => g.category === "faw-diesel").length;
  const cumminsCount = generators.filter(
    (g) => g.category === "cummins-diesel"
  ).length;
  const isuzuCount = generators.filter(
    (g) => g.category === "isuzu-diesel"
  ).length;

  // Get power range
  const powerRange = generators.reduce(
    (range, generator) => {
      const power = parseInt(
        generator.standbyPower?.match(/\d+/)?.[0] || "0",
        10
      );
      if (power < range.min) range.min = power;
      if (power > range.max) range.max = power;
      return range;
    },
    { min: Infinity, max: -Infinity }
  );
  //--------------------------------------------------

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const connectionModes = [
      ...new Set(generators.map((g) => g.connectionMode)),
    ];
    const aspirations = [
      ...new Set(
        generators.map((g) => g.engineSpecs?.aspiration).filter(Boolean)
      ),
    ];
    const cylinders = [
      ...new Set(
        generators.map((g) => g.engineSpecs?.cylinders).filter(Boolean)
      ),
    ];
    const alternatorTechs = [
      ...new Set(
        generators.map((g) => g.alternatorSpecs?.technology).filter(Boolean)
      ),
    ];
    const voltages = [
      ...new Set(generators.map((g) => g.startingVoltage).filter(Boolean)),
    ];

    // Extract control systems from features
    const controlSystems = [];
    generators.forEach((g) => {
      if (g.features) {
        if (g.features.some((f) => f.includes("SMARTGEN")))
          controlSystems.push("SMARTGEN");
        if (g.features.some((f) => f.includes("DEEP SEA ELECTRONICS")))
          controlSystems.push("DEEP SEA ELECTRONICS");
        if (g.features.some((f) => f.includes("Woodward easYgen")))
          controlSystems.push("Woodward easYgen");
      }
    });

    return {
      connectionModes: [...new Set(connectionModes)],
      aspirations: [...new Set(aspirations)],
      cylinders: [...new Set(cylinders)],
      controlSystems: [...new Set(controlSystems)],
      alternatorTechs: [...new Set(alternatorTechs)],
      voltages: [...new Set(voltages)],
    };
  }, [generators]);

  const categories = [
    { id: "all", name: "All Generators", count: totalGenerators },
    { id: "faw-diesel", name: "FAW Diesel", count: fawCount },
    { id: "cummins-diesel", name: "Cummins Diesel", count: cumminsCount },
    { id: "isuzu-diesel", name: "Isuzu Diesel", count: isuzuCount },
  ];

  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "power-asc", label: "Power (Low to High)" },
    { value: "power-desc", label: "Power (High to Low)" },
  ];

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterType];
      if (Array.isArray(currentValues)) {
        return {
          ...prev,
          [filterType]: currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value],
        };
      }
      return prev;
    });
  };

  const handlePowerRangeChange = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      powerRange: {
        ...prev.powerRange,
        [type]: value,
      },
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      connectionMode: [],
      aspiration: [],
      cylinders: [],
      controlSystem: [],
      alternatorTech: [],
      voltage: [],
      powerRange: { min: "", max: "" },
    });
    setSelectedCategory("all");
    setSearchTerm("");
  };

  // Count active filters
  const activeFilterCount = Object.values(activeFilters).reduce(
    (count, filter) => {
      if (Array.isArray(filter)) {
        return count + filter.length;
      } else if (typeof filter === "object" && filter.min && filter.max) {
        return count + 2;
      } else if (typeof filter === "object" && (filter.min || filter.max)) {
        return count + 1;
      }
      return count;
    },
    0
  );

  // Filter generators based on all criteria
  const filteredGenerators = useMemo(() => {
    return generators.filter((g) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "all" || g.category === selectedCategory;

      // Search filter
      const matchesSearch = [g.name, g.standbyPower, g.engine, g.category].some(
        (field) => field?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Advanced filters
      const matchesConnectionMode =
        activeFilters.connectionMode.length === 0 ||
        activeFilters.connectionMode.includes(g.connectionMode);

      const matchesAspiration =
        activeFilters.aspiration.length === 0 ||
        activeFilters.aspiration.includes(g.engineSpecs?.aspiration);

      const matchesCylinders =
        activeFilters.cylinders.length === 0 ||
        activeFilters.cylinders.includes(g.engineSpecs?.cylinders);

      const matchesVoltage =
        activeFilters.voltage.length === 0 ||
        activeFilters.voltage.includes(g.startingVoltage);

      const matchesAlternatorTech =
        activeFilters.alternatorTech.length === 0 ||
        activeFilters.alternatorTech.includes(g.alternatorSpecs?.technology);

      // Control system filter
      const matchesControlSystem =
        activeFilters.controlSystem.length === 0 ||
        activeFilters.controlSystem.some((system) =>
          g.features?.some((feature) => feature.includes(system))
        );

      // Power range filter
      const generatorPower = parseInt(
        g.standbyPower?.match(/\d+/)?.[0] || "0",
        10
      );
      const minPower = activeFilters.powerRange.min
        ? parseInt(activeFilters.powerRange.min)
        : 0;
      const maxPower = activeFilters.powerRange.max
        ? parseInt(activeFilters.powerRange.max)
        : Infinity;
      const matchesPowerRange =
        generatorPower >= minPower && generatorPower <= maxPower;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesConnectionMode &&
        matchesAspiration &&
        matchesCylinders &&
        matchesVoltage &&
        matchesAlternatorTech &&
        matchesControlSystem &&
        matchesPowerRange
      );
    });
  }, [generators, selectedCategory, searchTerm, activeFilters]);

  // Sort filtered generators
  const sortedGenerators = [...filteredGenerators].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "power-asc":
        return (
          parseInt(a.standbyPower?.match(/\d+/)?.[0] || "0", 10) -
          parseInt(b.standbyPower?.match(/\d+/)?.[0] || "0", 10)
        );
      case "power-desc":
        return (
          parseInt(b.standbyPower?.match(/\d+/)?.[0] || "0", 10) -
          parseInt(a.standbyPower?.match(/\d+/)?.[0] || "0", 10)
        );
      default:
        return 0;
    }
  });

  const loadMoreProducts = () => {
    setLimit((prev) => prev + 8);
  };

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
              "Explore LJA Power's complete line of diesel generators for commercial and industrial use.",
            url: "https://lja-power.com/products",
            isPartOf: {
              "@type": "WebSite",
              name: "LJA Power Limited Co.",
              url: "https://lja-power.com",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[var(--bg-dark)]">
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
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div className="product-filter flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-[var(--accent-yellow)] text-[var(--bg-dark)]"
                      : "bg-[var(--panel-blue)] text-white border border-[var(--card-blue)] hover:bg-[var(--card-blue)]"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-[var(--panel-blue)] border border-[var(--card-blue)] text-white rounded-lg px-4 py-2 hover:bg-[var(--card-blue)] transition-colors"
              >
                <Filter size={18} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-[var(--accent-yellow)] text-[var(--bg-dark)] rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <select
                id="product-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select bg-[var(--panel-blue)] border border-[var(--card-blue)] text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent w-40"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-[var(--panel-blue)] border border-[var(--card-blue)] rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-lg font-semibold">
                  Advanced Filters
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={clearAllFilters}
                    className="text-[var(--muted-gray)] hover:text-white text-sm flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-[var(--muted-gray)] hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Connection Mode */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Connection Mode
                  </label>
                  <div className="space-y-2">
                    {filterOptions.connectionModes.map((mode) => (
                      <label
                        key={mode}
                        className="flex items-center text-[var(--muted-gray)] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.connectionMode.includes(mode)}
                          onChange={() =>
                            handleFilterChange("connectionMode", mode)
                          }
                          className="mr-2 text-[var(--accent-yellow)] focus:ring-[var(--accent-yellow)]"
                        />
                        {mode}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Aspiration Type */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Aspiration Type
                  </label>
                  <div className="space-y-2">
                    {filterOptions.aspirations.map((asp) => (
                      <label
                        key={asp}
                        className="flex items-center text-[var(--muted-gray)] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.aspiration.includes(asp)}
                          onChange={() => handleFilterChange("aspiration", asp)}
                          className="mr-2 text-[var(--accent-yellow)] focus:ring-[var(--accent-yellow)]"
                        />
                        {asp}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cylinders */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Cylinders
                  </label>
                  <div className="space-y-2">
                    {filterOptions.cylinders.map((cyl) => (
                      <label
                        key={cyl}
                        className="flex items-center text-[var(--muted-gray)] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.cylinders.includes(cyl)}
                          onChange={() => handleFilterChange("cylinders", cyl)}
                          className="mr-2 text-[var(--accent-yellow)] focus:ring-[var(--accent-yellow)]"
                        />
                        {cyl}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Control System */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Control System
                  </label>
                  <div className="space-y-2">
                    {filterOptions.controlSystems.map((sys) => (
                      <label
                        key={sys}
                        className="flex items-center text-[var(--muted-gray)] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.controlSystem.includes(sys)}
                          onChange={() =>
                            handleFilterChange("controlSystem", sys)
                          }
                          className="mr-2 text-[var(--accent-yellow)] focus:ring-[var(--accent-yellow)]"
                        />
                        {sys}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Alternator Technology */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Alternator Tech
                  </label>
                  <div className="space-y-2">
                    {filterOptions.alternatorTechs.map((tech) => (
                      <label
                        key={tech}
                        className="flex items-center text-[var(--muted-gray)] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.alternatorTech.includes(tech)}
                          onChange={() =>
                            handleFilterChange("alternatorTech", tech)
                          }
                          className="mr-2 text-[var(--accent-yellow)] focus:ring-[var(--accent-yellow)]"
                        />
                        {tech}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Starting Voltage */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Starting Voltage
                  </label>
                  <div className="space-y-2">
                    {filterOptions.voltages.map((volt) => (
                      <label
                        key={volt}
                        className="flex items-center text-[var(--muted-gray)] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.voltage.includes(volt)}
                          onChange={() => handleFilterChange("voltage", volt)}
                          className="mr-2 text-[var(--accent-yellow)] focus:ring-[var(--accent-yellow)]"
                        />
                        {volt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Power Range */}
                <div className="md:col-span-2">
                  <label className="block text-white text-sm font-medium mb-2">
                    Power Range (kVA)
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Min"
                        value={activeFilters.powerRange.min}
                        onChange={(e) =>
                          handlePowerRangeChange("min", e.target.value)
                        }
                        className="w-full bg-[var(--bg-dark)] border border-[var(--card-blue)] rounded px-3 py-2 text-white placeholder-[var(--muted-gray)] focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Max"
                        value={activeFilters.powerRange.max}
                        onChange={(e) =>
                          handlePowerRangeChange("max", e.target.value)
                        }
                        className="w-full bg-[var(--bg-dark)] border border-[var(--card-blue)] rounded px-3 py-2 text-white placeholder-[var(--muted-gray)] focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Count and Search */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-[var(--muted-gray)]">
              Showing {Math.min(sortedGenerators.length, limit)} of{" "}
              {sortedGenerators.length} generators
              {selectedCategory !== "all" &&
                ` in ${
                  categories.find((c) => c.id === selectedCategory)?.name
                }`}
              {searchTerm && ` matching "${searchTerm}"`}
              {activeFilterCount > 0 &&
                ` with ${activeFilterCount} filter${
                  activeFilterCount > 1 ? "s" : ""
                }`}
            </p>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-gray)] h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search generators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[var(--panel-blue)] border border-[var(--card-blue)] rounded-lg focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent text-white placeholder-[var(--muted-gray)] w-64"
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
              <p className="text-[var(--muted-gray)] text-lg">
                No generators found matching your criteria.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 bg-[var(--panel-blue)] text-[var(--muted-gray)] border border-[var(--card-blue)] px-6 py-2 rounded-lg hover:bg-[var(--card-blue)] transition-colors font-medium"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Load More */}
          {limit < sortedGenerators.length && (
            <div className="flex justify-center mt-12">
              <button
                onClick={loadMoreProducts}
                className="bg-[var(--panel-blue)] text-white cursor-pointer border border-[var(--card-blue)] px-6 py-3 rounded-lg hover:bg-[var(--card-blue)] transition-colors font-medium"
              >
                Load More Generators ({sortedGenerators.length - limit}{" "}
                remaining)
              </button>
            </div>
          )}

          {/* CTA Section */}
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
