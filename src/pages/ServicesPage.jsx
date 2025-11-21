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
} from "lucide-react";

// SEO
import { Helmet } from "react-helmet";

// Routing
import { Link } from "react-router-dom";

// Components
import PageNavigationHeader from "../components/layout/PageNavigationHeader";

// UI
import ServiceCard from "../components/ui/ServicesCard";

// Hooks
import { useEffect, useState } from "react";

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: "preventive-maintenance",
      image: "/images/preventive-maintenance.webp",
      icon: Wrench,
      title: "Preventive Maintenance",
      tagline: "Keep systems running at peak performance",
      description:
        "Proactive maintenance programs designed to keep your generator operating reliably and efficiently.",
      fullDescription:
        "Our preventive maintenance programs are designed to keep your generator operating reliably and efficiently. We handle regular inspections, fluid checks, filter replacements, and comprehensive testing to prevent unexpected breakdowns. Regular maintenance is critical to ensuring your generator operates reliably when you need it most.",
      benefits: [
        "Extended equipment lifespan",
        "Reduced risk of failures",
        "Optimized fuel efficiency",
        "Warranty compliance",
        "Detailed service reports",
      ],
      process: [
        "Equipment assessment",
        "Maintenance schedule planning",
        "Inspections",
        "Fluid and filter checks",
        "Battery testing",
        "Full performance report",
      ],
      color: "from-blue-500 to-cyan-500",
      darkColor: "bg-blue-600/30",
      accentBg: "bg-blue-100",
    },
    {
      id: "ats-installation",
      image: "/images/ats-installation.webp",
      icon: Zap,
      title: "ATS Installation",
      tagline: "Automatic power failover in seconds",
      description: "Professional ATS installation for seamless transitions.",
      fullDescription:
        "Professional Automatic Transfer Switch installation that seamlessly switches between utility power and your generator with zero downtime. Ensures continuous operation during outages with intelligent control systems. An ATS system provides automatic failover, eliminating the need for manual switching and ensuring uninterrupted power supply to your critical systems.",
      benefits: [
        "Automatic transfer",
        "Zero downtime",
        "Seamless electrical integration",
        "Certified installation",
        "24/7 monitoring",
      ],
      process: [
        "Electrical assessment",
        "Sizing analysis",
        "Installation",
        "Generator integration",
        "Testing",
        "Training & documentation",
      ],
      color: "from-yellow-500 to-orange-500",
      darkColor: "bg-yellow-600/30",
      accentBg: "bg-yellow-100",
    },
    {
      id: "controller-conversion",
      image: "images/controller-conversion.webp",
      icon: Cpu,
      title: "Controller Conversion",
      tagline: "Upgrade to smart generator controls",
      description: "Upgrade outdated controllers to modern smart systems.",
      fullDescription:
        "Replace outdated controllers with modern, intelligent generator control systems. Enhanced monitoring, diagnostics, and remote capabilities provide superior performance and management of your power generation infrastructure. Modern controllers offer real-time data, predictive maintenance alerts, and remote management capabilities that older systems cannot provide.",
      benefits: [
        "Advanced monitoring",
        "Better fuel efficiency",
        "Remote management",
        "Load shedding",
        "Data logging",
      ],
      process: [
        "Assessment",
        "Controller compatibility check",
        "Installation",
        "Configuration",
        "Calibration",
        "Training",
      ],
      color: "from-purple-500 to-pink-500",
      darkColor: "bg-purple-600/30",
      accentBg: "bg-purple-100",
    },
    {
      id: "troubleshooting",
      image: "/images/genset-repair-services.webp",
      icon: AlertTriangle,
      title: "Troubleshooting & Diagnostics",
      tagline: "Fast diagnosis and expert solutions",
      description: "Quickly identify and resolve generator issues.",
      fullDescription:
        "Expert diagnostic services to quickly identify and resolve generator issues. Our experienced technicians use advanced testing equipment to pinpoint problems and implement effective solutions with minimal downtime. When issues arise, quick diagnosis and professional resolution can be the difference between a minor repair and major equipment failure.",
      benefits: [
        "Accurate testing",
        "Rapid resolution",
        "Preventive recommendations",
        "Detailed reports",
        "24/7 availability",
      ],
      process: [
        "Issue assessment",
        "Diagnostic testing",
        "Root cause ID",
        "Repair planning",
        "Professional repairs",
        "Post-testing",
      ],
      color: "from-red-500 to-rose-500",
      darkColor: "bg-red-600/30",
      accentBg: "bg-red-100",
    },
    {
      id: "delivery",
      image: "/images/delivery-installation.webp",
      icon: Truck,
      title: "Delivery & Installation",
      tagline: "Professional setup from delivery to operation",
      description: "Complete end-to-end delivery and installation.",
      fullDescription:
        "Complete delivery and installation service for your new generator equipment. We handle transportation, site preparation, professional installation, initial startup, and comprehensive testing to ensure reliable operation. Our team ensures your new equipment is properly positioned, connected, and tested before handover.",
      benefits: [
        "Insured transport",
        "Certified installation",
        "Proper positioning",
        "Startup testing",
        "Documentation",
      ],
      process: [
        "Scheduling",
        "Transportation",
        "Site preparation",
        "Installation",
        "Load testing",
        "Training",
      ],
      color: "from-green-500 to-emerald-500",
      darkColor: "bg-green-600/30",
      accentBg: "bg-green-100",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Industry-Leading Expertise",
      description:
        "4+ years of experience serving generator systems with certified technicians and proven track records",
    },
    {
      icon: Clock,
      title: "Rapid Response",
      description:
        "Average emergency response under 2 hours, 24/7 availability for critical situations",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description:
        "Access to experienced techniciansPersonalized service with direct access to experienced professionals who know your systems",
    },
    {
      icon: Lightbulb,
      title: "Smart Solutions",
      description:
        "Modern technology and innovative approaches to maximize your generator performance",
    },
  ];

  return (
    <div className="bg-[var(--bg-dark)]  text-white">
      <Helmet>
        <title>
          Generator Services | Preventive Maintenance, ATS Installation &
          Repairs | LJA Power Limited Co.
        </title>

        <meta
          name="description"
          content="LJA Power Limited Co. offers professional generator services including preventive maintenance, ATS installation, troubleshooting, delivery, installation, and controller conversions. Ensure reliable power for homes, buildings, and businesses."
        />

        <meta
          name="keywords"
          content="generator services, preventive maintenance, ATS installation, generator repair, genset troubleshooting, controller conversion, generator delivery installation, LJA Power, generator technician Philippines"
        />

        <meta
          property="og:title"
          content="Professional Generator Services | LJA Power Limited Co."
        />
        <meta
          property="og:description"
          content="Full generator solutions including maintenance, diagnostics, ATS installation, controller upgrades, and delivery & installation services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ljapower.com/services" />
        <meta property="og:image" content="/images/ServicesPageHeroImg.webp" />

        <link rel="canonical" href="https://ljapower.com/services" />

        <script type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Generator Services",
  "provider": {
    "@type": "Organization",
    "name": "LJA Power Limited Co.",
    "url": "https://ljapower.com"
  },
  "description": "Complete generator service solutions including Preventive Maintenance, ATS Installation, Troubleshooting & Diagnostics, Delivery & Installation, and Controller Conversion.",
  "serviceType": [
    "Preventive Maintenance",
    "Automatic Transfer Switch (ATS) Installation",
    "Troubleshooting & Diagnostics",
    "Delivery & Installation",
    "Controller Conversion"
  ],
  "areaServed": "Philippines"
}
`}
        </script>
      </Helmet>

      <PageNavigationHeader
        h1="Professional"
        h1Yellow="Generator Services"
        p="Complete power generation solutions tailored to your needs"
        id="services-page-hero"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <section className="mx-auto container py-22">
        <div className="lg:mx-20">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4">Our Core Services</h2>
            <p className="text-balance text-[var(--muted-gray)]">
              LJA Power Limited Co. provides comprehensive generator solutions
              covering everything from preventive maintenance to emergency
              support. We ensure your power generation systems operate reliably
              when you need them most.
            </p>
          </div>

          <div className="mt-10">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[var(--card-blue)] py-24">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why LJA Power?</h2>
          <p className="text-lg text-muted-foreground">
            Expertise, reliability, and customer-focused service
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 rounded-full bg-[var(--accent-yellow)]/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-[var(--accent-yellow)]" />
                </div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-[var(--muted-gray)] text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-card text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Protect Your Power?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Contact LJA Power Limited Co. today to discuss your generator needs
            and discover how we can ensure your operations never miss a beat.
          </p>

          <div className="flex-center">
            <Link to="/contacts" className="btn-yellow w-fit">
              Schedule Your Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
