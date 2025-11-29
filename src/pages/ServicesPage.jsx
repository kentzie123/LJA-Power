// SEO
import SEO from "../components/layout/SEO";

// Styling
import "../assets/css/pages/ServicesPage.css";

// Icons
import {
  Wrench,
  Zap,
  Cpu,
  AlertTriangle,
  Truck,
  Shield,
  Clock,
  Users,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

// Components
import PageNavigationHeader from "../components/layout/PageNavigationHeader";

// Routing
import { Link } from "react-router-dom";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const services = [
    {
      id: "preventive-maintenance",
      image: "/images/preventive-maintenance.webp",
      icon: Wrench,
      title: "Preventive Maintenance",
      fullDescription:
        "Our preventive maintenance programs are designed to keep your generator operating reliably and efficiently. We handle regular inspections, fluid checks, filter replacements, and comprehensive testing to prevent unexpected breakdowns.",
      benefits: [
        "Extended equipment lifespan",
        "Reduced risk of failures",
        "Optimized fuel efficiency",
        "Detailed service reports",
      ],
    },
    {
      id: "ats-installation",
      image: "/images/ats-installation.webp",
      icon: Zap,
      title: "ATS Installation",
      fullDescription:
        "Professional Automatic Transfer Switch installation that seamlessly switches between utility power and your generator with zero downtime. Ensures continuous operation during outages with intelligent control systems.",
      benefits: [
        "Automatic transfer",
        "Zero downtime",
        "Seamless electrical integration",
        "Certified installation",
      ],
    },
    {
      id: "controller-conversion",
      image: "/images/controller-conversion.webp",
      icon: Cpu,
      title: "Controller Conversion",
      fullDescription:
        "Replace outdated controllers with modern, intelligent generator control systems. Enhanced monitoring, diagnostics, and remote capabilities provide superior performance and management of your power generation infrastructure.",
      benefits: [
        "Advanced monitoring",
        "Better fuel efficiency",
        "Remote management",
        "Data logging capabilities",
      ],
    },
    {
      id: "troubleshooting",
      image: "/images/genset-repair-services.webp",
      icon: AlertTriangle,
      title: "Troubleshooting",
      fullDescription:
        "Expert diagnostic services to quickly identify and resolve generator issues. Our experienced technicians use advanced testing equipment to pinpoint problems and implement effective solutions with minimal downtime.",
      benefits: [
        "Accurate diagnostic testing",
        "Rapid issue resolution",
        "Preventive recommendations",
        "24/7 availability",
      ],
    },
    {
      id: "delivery",
      image: "/images/delivery-installation.webp",
      icon: Truck,
      title: "Delivery & Installation",
      fullDescription:
        "Complete delivery and installation service for your new generator equipment. We handle transportation, site preparation, professional installation, initial startup, and comprehensive testing.",
      benefits: [
        "Insured transport",
        "Certified installation",
        "Proper positioning",
        "Startup testing",
      ],
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Industry-Leading Expertise",
      description:
        "4+ years of experience serving generator systems with certified technicians.",
    },
    {
      icon: Clock,
      title: "Rapid Response",
      description:
        "Average emergency response under 2 hours, 24/7 availability for critical situations.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description:
        "Personalized service with direct access to experienced professionals who know your systems.",
    },
    {
      icon: Lightbulb,
      title: "Smart Solutions",
      description:
        "Modern technology and innovative approaches to maximize your generator performance.",
    },
  ];

  useGSAP(() => {
    // Animate each service row as it comes into view
    const sections = gsap.utils.toArray(".service-row");

    sections.forEach((section) => {
      gsap.from(section.querySelectorAll(".animate-item"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // Start animating when top of section hits 80% of viewport
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    });
  });

  return (
    <div className="bg-[var(--bg-dark)] text-white overflow-hidden">
      <SEO
        title="Generator Services | Maintenance & Installation"
        description="Professional generator services: preventive maintenance, ATS installation, troubleshooting & repairs. 24/7 support across Philippines. LJA Power Limited Co."
        url="https://lja-power.com/services"
        image="https://lja-power.com/images/ServicesPageHeroImg.webp"
      />

      <PageNavigationHeader
        h1="Professional"
        h1Yellow="Services"
        p="Comprehensive power generation solutions tailored to your specific operational needs."
        id="services-page-hero"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <div className="section-container py-20 lg:py-32 space-y-32">
        {/* Intro Text */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-6">
            Our Core{" "}
            <span className="text-[var(--accent-yellow)]">Expertise</span>
          </h2>
          <p className="text-[var(--muted-gray)] text-lg leading-relaxed">
            LJA Power Limited Co. provides end-to-end generator solutions. From
            installation to emergency repairs, we ensure your power systems
            operate reliably when you need them most.
          </p>
        </div>

        {/* --- SERVICE ROWS (Zig-Zag Layout) --- */}
        {services.map((service, index) => {
          const isEven = index % 2 === 0; // Check if row is even (0, 2, 4...)
          const Icon = service.icon;

          return (
            <div
              key={service.id}
              className={`service-row grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
                !isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE SIDE (Swaps position using CSS Grid order or Flex direction logic if needed, but handled by grid cols here) */}
              <div className={`relative group ${!isEven ? "lg:order-2" : ""}`}>
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl aspect-[4/3] animate-item">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark Gradient Overlay for mood */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-transparent to-transparent opacity-60"></div>

                  {/* Big Number Watermark (e.g., "01") */}
                  <div className="absolute -bottom-10 -right-4 font-heading text-9xl font-bold text-white/5 select-none pointer-events-none tracking-tighter">
                    0{index + 1}
                  </div>
                </div>

                {/* Decorative Box Behind */}
                <div
                  className={`absolute -bottom-4 -left-4 w-24 h-24 bg-[var(--accent-yellow)]/10 rounded-lg -z-10 animate-item border border-[var(--accent-yellow)]/20 ${
                    !isEven ? "left-auto -right-4" : ""
                  }`}
                ></div>
              </div>

              {/* TEXT SIDE */}
              <div
                className={`space-y-8 animate-item ${
                  !isEven ? "lg:order-1" : ""
                }`}
              >
                {/* Title & Icon */}
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--panel-blue)] p-3 rounded-lg shadow-lg border border-white/10 shrink-0">
                    <Icon className="size-8 text-[var(--accent-yellow)]" />
                  </div>
                  <h3 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wide text-white">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-[var(--accent-yellow)] pl-6">
                  {service.fullDescription}
                </p>

                {/* Benefits List */}
                <div>
                  <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-[var(--muted-gray)] mb-4 flex items-center gap-2">
                    Key Benefits{" "}
                    <div className="h-[1px] w-12 bg-[var(--muted-gray)]/50"></div>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 group/item"
                      >
                        <CheckCircle2 className="size-5 text-[var(--accent-yellow)] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-4">
                  <Link
                    to="/contacts"
                    className="group inline-flex items-center gap-2 text-[var(--accent-yellow)] font-heading uppercase font-bold tracking-wider hover:text-white transition-colors"
                  >
                    Request this service{" "}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- WHY CHOOSE US (GRID) --- */}
      <section className="bg-[var(--card-blue)] py-24 px-6 relative overflow-hidden">
        {/* Background texture optional */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent-yellow)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold uppercase tracking-wide mb-4 text-white">
              Why LJA Power?
            </h2>
            <p className="text-lg text-[var(--muted-gray)]">
              Expertise, reliability, and customer-focused service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group p-8 bg-[var(--bg-dark)]/80 rounded-xl border border-white/5 hover:border-[var(--accent-yellow)] transition-all duration-300 hover:-translate-y-2 shadow-lg"
                >
                  <div className="w-14 h-14 rounded-lg bg-[var(--accent-yellow)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--accent-yellow)] transition-colors duration-300">
                    <Icon className="h-7 w-7 text-[var(--accent-yellow)] group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="text-xl font-heading font-bold uppercase tracking-wide mb-3 text-white group-hover:text-[var(--accent-yellow)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--muted-gray)] text-sm leading-relaxed group-hover:text-white transition-colors">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 px-6 bg-[var(--bg-dark)] text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight text-white">
            Ready to Protect Your Power?
          </h2>
          <p className="text-xl text-[var(--muted-gray)] mb-10">
            Contact LJA Power Limited Co. today to discuss your generator needs
            and discover how we can ensure your operations never miss a beat.
          </p>

          <div className="flex justify-center">
            <Link
              to="/contacts"
              className="btn-yellow px-10 py-4 text-base font-heading font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(246,231,42,0.4)] hover:shadow-[0_0_30px_rgba(246,231,42,0.6)]"
            >
              Schedule Your Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
