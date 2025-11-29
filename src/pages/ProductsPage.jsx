// SEO
import SEO from "../components/layout/SEO";

// Styling
import "../assets/css/pages/ProductsPage.css";

// Components
import PageNavigationHeader from "../components/layout/PageNavigationHeader";
import ProductFilters from "../components/ui/ProductFilters";

// Routing
import { Link } from "react-router-dom";

// Hooks
import { useState, useMemo } from "react";

// Icons
import { Search, Filter } from "lucide-react";

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

  // State for the advanced filters
  const [activeFilters, setActiveFilters] = useState({
    connectionMode: [],
    aspiration: [],
    cylinders: [],
    controlSystem: [],
    alternatorTech: [],
    voltage: [],
    powerRange: { min: "", max: "" },
  });

  // --- LOGIC: SEO Calculations ---
  const totalGenerators = generators.length;
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

  // --- LOGIC: Calculate Unique Filter Options ---
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

    const controlSystems = [];
    generators.forEach((g) => {
      if (g.features) {
        if (g.features.some((f) => f.includes("SMARTGEN")))
          controlSystems.push("SMARTGEN");
        if (g.features.some((f) => f.includes("DEEP SEA")))
          controlSystems.push("DEEP SEA ELECTRONICS");
        if (g.features.some((f) => f.includes("Woodward")))
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
  }, []);

  const categories = [
    { id: "all", name: "All Generators", count: totalGenerators },
    {
      id: "faw-diesel",
      name: "FAW Diesel",
      count: generators.filter((g) => g.category === "faw-diesel").length,
    },
    {
      id: "cummins-diesel",
      name: "Cummins Diesel",
      count: generators.filter((g) => g.category === "cummins-diesel").length,
    },
    {
      id: "isuzu-diesel",
      name: "Isuzu Diesel",
      count: generators.filter((g) => g.category === "isuzu-diesel").length,
    },
  ];

  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "power-asc", label: "Power (Low to High)" },
    { value: "power-desc", label: "Power (High to Low)" },
  ];

  // --- LOGIC: Handle Filter Updates ---
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterType];
      return {
        ...prev,
        [filterType]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const handlePowerRangeChange = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      powerRange: { ...prev.powerRange, [type]: value },
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

  // --- LOGIC: Filter the Data ---
  const filteredGenerators = useMemo(() => {
    return generators.filter((g) => {
      // 1. Basic Filters
      const matchesCategory =
        selectedCategory === "all" || g.category === selectedCategory;
      const matchesSearch = [g.name, g.standbyPower, g.engine, g.category].some(
        (field) => field?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // 2. Advanced Filters
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

      const matchesControlSystem =
        activeFilters.controlSystem.length === 0 ||
        activeFilters.controlSystem.some((system) =>
          g.features?.some((feature) => feature.includes(system))
        );

      // 3. Power Range Logic
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

  // --- LOGIC: Sorting ---
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

  const activeFilterCount = Object.values(activeFilters).reduce(
    (acc, val) =>
      acc + (Array.isArray(val) ? val.length : val.min || val.max ? 1 : 0),
    0
  );

  return (
    <>
      <SEO
        title={`Diesel Generators ${powerRange.min}-${powerRange.max}kVA`}
        description={`${totalGenerators} diesel generators (${powerRange.min}-${powerRange.max}kVA) from FAW, Cummins & Isuzu.`}
        url="https://lja-power.com/products"
      />

      <div className="min-h-screen bg-[var(--bg-dark)]">
        <PageNavigationHeader
          h1="Our"
          h1Yellow="Products"
          p="Beyond selling generators, LJA Power provides full-service energy solutions to keep your systems running smoothly."
          id="product-page-hero"
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Products" }]}
        />

        <section className="section-container py-12">
          {/* --- CONTROL BAR --- */}
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-10 gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    px-6 py-2 rounded-md text-sm font-heading font-bold uppercase tracking-wide transition-all border
                    ${
                      selectedCategory === category.id
                        ? "bg-[var(--accent-yellow)] text-black border-[var(--accent-yellow)] shadow-[0_0_15px_rgba(246,231,42,0.3)]"
                        : "bg-transparent text-[var(--muted-gray)] border-white/10 hover:border-white/30 hover:text-white"
                    }
                  `}
                >
                  {category.name}{" "}
                  <span className="opacity-60 text-xs ml-1">
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-md font-heading font-bold uppercase tracking-wide text-sm transition-all border
                  ${
                    showFilters
                      ? "bg-[var(--panel-blue)] text-white border-[var(--panel-blue)]"
                      : "bg-transparent text-white border-white/20 hover:border-[var(--accent-yellow)]"
                  }
                `}
              >
                <Filter size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-[var(--accent-yellow)] text-black rounded-full size-5 text-[10px] flex items-center justify-center font-sans font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-gray)] size-4" />
                  <input
                    type="text"
                    placeholder="Search model or power..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0C2430] border border-white/10 rounded-md focus:border-[var(--accent-yellow)] focus:ring-1 focus:ring-[var(--accent-yellow)] text-white placeholder-white/30 outline-none text-sm transition-all"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#0C2430] border border-white/10 text-white text-sm rounded-md px-4 py-2.5 focus:border-[var(--accent-yellow)] outline-none cursor-pointer font-heading tracking-wide"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* --- NEW EXTRACTED FILTER COMPONENT --- */}
          <ProductFilters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            activeFilters={activeFilters}
            filterOptions={filterOptions}
            handleFilterChange={handleFilterChange}
            handlePowerRangeChange={handlePowerRangeChange}
            clearAllFilters={clearAllFilters}
          />

          {/* --- PRODUCTS GRID --- */}
          {sortedGenerators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sortedGenerators.slice(0, limit).map((generator) => (
                <ProductCard key={generator.slug} product={generator} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#0C2430]/50 rounded-xl border border-dashed border-white/10">
              <div className="text-[var(--accent-yellow)] mb-4 flex justify-center">
                <Search size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-white text-2xl font-heading font-bold uppercase mb-2">
                No Generators Found
              </h3>
              <p className="text-[var(--muted-gray)]">
                Try adjusting your search or filters to find what you need.
              </p>
              <button onClick={clearAllFilters} className="mt-6 btn-blue">
                Reset Filters
              </button>
            </div>
          )}

          {/* --- LOAD MORE --- */}
          {limit < sortedGenerators.length && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() => setLimit((prev) => prev + 8)}
                className="btn-backdrop px-10 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all"
              >
                Load More Units
              </button>
            </div>
          )}

          {/* --- CTA --- */}
          <div className="bg-[var(--card-blue)] flex flex-col items-center text-center gap-6 py-16 px-6 mt-20 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-yellow)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight mb-2">
                Not Sure Which Generator You Need?
              </h2>
              <p className="text-[var(--muted-gray)] max-w-2xl mx-auto mb-8 text-lg">
                Our power generation experts are ready to assess your
                requirements and recommend the perfect configuration.
              </p>

              <Link
                to="/contacts"
                className="btn-yellow inline-flex px-8 py-4 text-base"
              >
                Get Expert Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductsPage;
