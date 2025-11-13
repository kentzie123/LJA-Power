// Icons
import { Check } from "lucide-react";

// Routing
import { Link } from "react-router-dom";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ServicesHomePage = () => {
  useGSAP(() => {
    const serviceHomePageTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#service-hp",
        start: "top center",
      },
    });

    serviceHomePageTimeline
      .from(".service-hp-img", {
        opacity: 0,
        ease: "power2.inOut",
      })
      .from(".service-hp-header", {
        xPercent: 100,
        opacity: 0,
        ease: "power2.inOut",
      })
      .from(
        ".service-hp-p",
        {
          xPercent: 100,
          opacity: 0,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      .from(
        ".proccess",
        {
          xPercent: 100,
          opacity: 0,
          ease: "power2.inOut",
          stagger: 0.1,
        },
        "-=0.2"
      )
      .from(
        ".service-hp-btn",
        {
          xPercent: 100,
          opacity: 0,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
  });
  return (
    <section id="service-hp" className="bg-[var(--bg-dark)] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 px-4 py-22 mx-auto container">
        <div className="p-6 flex items-center">
          <img
            className="service-hp-img object-cover h-72 w-full rounded-md"
            src="/images/abt4.webp"
            alt="Technician checking the generator"
          />
        </div>
        <div className="space-y-6 p-6">
          <div className="service-hp-header text-3xl font-bold">
            Complete Power Solutions
          </div>
          <p className="service-hp-p text-sm text-[var(--muted-gray)]">
            From initial consultation to ongoing maintenance, we provide
            comprehensive power generation solutions tailored to your specific
            needs.
          </p>

          <ul className="text-sm space-y-4">
            <li className="proccess">
              <Check className="text-[var(--accent-yellow)] size-4 inline me-2" />{" "}
              Professional site assessment and planning
            </li>
            <li className="proccess">
              <Check className="text-[var(--accent-yellow)] size-4 inline me-2" />{" "}
              Expert installation and commissioning
            </li>
            <li className="proccess">
              <Check className="text-[var(--accent-yellow)] size-4 inline me-2" />{" "}
              Preventive maintenance programs
            </li>
            <li className="proccess">
              <Check className="text-[var(--accent-yellow)] size-4 inline me-2" />{" "}
              24/7 emergency support
            </li>
            <li className="proccess">
              <Check className="text-[var(--accent-yellow)] size-4 inline me-2" />{" "}
              Parts and services availability
            </li>
            <li className="proccess">
              <Check className="text-[var(--accent-yellow)] size-4 inline me-2" />{" "}
              Compliance and certificate assistance
            </li>
          </ul>

          <Link className="service-hp-btn btn-yellow w-fit">
            View Our Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesHomePage;
