// Icons
import { Check } from "lucide-react";

// Routing
import { Link } from "react-router-dom";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Responsive Images (Optimized)
import abt4SrcSet from "../../assets/images/abt4.webp?w=400;800;1200&format=webp&as=srcset";
import abt4Fallback from "../../assets/images/abt4.webp?w=1200&format=webp";

const ServicesHomePage = () => {
  useGSAP(() => {
    const serviceHomePageTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#service-hp",
        // CRITICAL FIX: Make the trigger start sooner (when 90% of the section is visible)
        start: "top 90%",
        toggleActions: "play none none reverse", // Allows re-triggering
      },
    });

    serviceHomePageTimeline
      .fromTo(
        ".service-hp-img",
        { opacity: 0 },
        { opacity: 1, ease: "power2.inOut" }
      )
      .fromTo(
        ".service-hp-header",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.inOut" }
      )
      .fromTo(
        ".service-hp-p",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.inOut" },
        "-=0.2"
      )
      .fromTo(
        ".proccess",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.inOut", stagger: 0.1 },
        "-=0.2"
      )
      .fromTo(
        // ⬅️ BUTTON FIX
        ".service-hp-btn",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          clearProps: "all", // Ensures GSAP removes the opacity: 1 style when done
        },
        "-=0.2"
      );
  });

  return (
    <section
      id="service-hp"
      className="bg-[var(--bg-dark)] text-white overflow-hidden"
    >
      <div className="section-container grid grid-cols-1 gap-12 lg:grid-cols-2 py-30 items-center">
        {/* Left: Image (Optimized) */}
        <div className="flex items-center justify-center">
          <div className="overflow-hidden aspect-square rounded-xl shadow-2xl relative w-full max-w-lg">
            <img
              className="service-hp-img object-cover w-full h-full"
              src={abt4Fallback}
              srcSet={abt4SrcSet}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Technician Checking the Generator"
              loading="lazy"
            />
            {/* Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)]/50 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-8">
          {/* Header: Industrial Style */}
          <div className="service-hp-header text-4xl lg:text-5xl font-bold font-heading uppercase tracking-tight leading-none text-white">
            Complete <span className="text-[var(--accent-yellow)]">Power</span>{" "}
            Solutions
          </div>

          <p className="service-hp-p text-base md:text-lg text-[var(--muted-gray)] leading-relaxed">
            From initial consultation to ongoing maintenance, we provide
            comprehensive power generation solutions tailored to your specific
            needs.
          </p>

          <ul className="text-base space-y-4">
            {[
              "Professional site assessment and planning",
              "Expert installation and commissioning",
              "Preventive maintenance programs",
              "24/7 emergency support",
              "Parts and services availability",
              "Compliance and certificate assistance",
            ].map((item, index) => (
              <li key={index} className="proccess flex items-start">
                <Check className="text-[var(--accent-yellow)] size-5 min-w-5 mt-0.5 me-3" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Link
              to="/services"
              className="service-hp-btn btn-yellow w-fit font-heading font-bold uppercase tracking-wider px-8 py-3"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHomePage;
