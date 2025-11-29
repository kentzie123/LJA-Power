// SEO
import SEO from "../components/layout/SEO";

// Styling
import "../assets/css/pages/OurWorksPage.css"

// Components
import PageNavigationHeader from "../components/layout/PageNavigationHeader";
import OurWorkCard from "../components/ui/OurWorkCard";

// Data
import { works } from "../../constants";

// Icons
import { RefreshCcw } from "lucide-react";

// Hooks
import { useState, useMemo } from "react";

// Routing
import { Link } from "react-router-dom";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurWorksPage = () => {
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Installation",
    "Maintenance",
    "Delivery",
    "Repair",
  ];

  const filteredWorks = useMemo(() => {
    if (filter === "All") return works;
    return works.filter(
      (work) => work.category?.toLowerCase() === filter.toLowerCase()
    );
  }, [filter, works]);

  useGSAP(() => {
    gsap.fromTo(
      ".project-card-anim",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        overwrite: true,
      }
    );
  }, [filter]);

  return (
    <div className="bg-[var(--bg-dark)] text-white min-h-screen">
      <SEO
        title="Field Operations Gallery | LJA Power"
        description="Browse our recent generator installations, deliveries, preventive maintenance work, and client success stories across the Philippines."
        url="https://lja-power.com/our-works"
        image="https://lja-power.com/images/ServicesPageHeroImg.webp"
      />

      <PageNavigationHeader
        h1="Our"
        h1Yellow="Works"
        p="A documented log of our successful field operations across the region."
        id="our-works-page-hero"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Our Works" }]}
      />

      <div className="section-container py-20 lg:py-32">
        {/* --- SECTION 1: FILTERABLE GALLERY --- */}
        <div className="flex flex-col items-center mb-16 space-y-6">
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-center">
            Recent{" "}
            <span className="text-[var(--accent-yellow)]">
              Field Operations
            </span>
          </h2>

          {/* Industrial Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-[var(--card-blue)]/50 rounded-lg border border-white/10 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  px-6 py-2 rounded-md text-sm font-heading font-bold uppercase tracking-wider transition-all border
                  ${
                    filter === cat
                      ? "bg-[var(--accent-yellow)] text-black border-[var(--accent-yellow)] shadow-[0_0_15px_rgba(246,231,42,0.3)]"
                      : "bg-transparent text-[var(--muted-gray)] border-transparent hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        {filteredWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((work) => (
              <div key={work.slug} className="project-card-anim">
                <OurWorkCard project={work} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
            <div className="flex justify-center mb-4 text-[var(--muted-gray)]">
              <RefreshCcw className="size-10" />
            </div>
            <p className="text-xl font-heading uppercase text-[var(--muted-gray)]">
              No records found for "{filter}"
            </p>
            <button
              onClick={() => setFilter("All")}
              className="mt-4 text-[var(--accent-yellow)] underline hover:text-white"
            >
              View All Operations
            </button>
          </div>
        )}
      </div>

      {/* --- CTA --- */}
      <section className="py-24 px-6 bg-[var(--card-blue)] text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight text-white">
            Ready to Protect Your Power?
          </h2>
          <p className="text-xl text-[var(--muted-gray)] mb-10">
            Contact LJA Power Limited Co. today to discuss your generator needs.
          </p>

          <div className="flex justify-center">
            <Link
              to="/contacts"
              className="btn-yellow px-10 py-4 text-base font-heading font-bold uppercase tracking-wider"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWorksPage;
