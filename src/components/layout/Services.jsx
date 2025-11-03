import { Wrench, Zap, Truck } from "lucide-react";
import "../assets/css/Services.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Services = () => {
  useGSAP(() => {
    const servicesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#services",
        start: "top 80%",
      },
    });

    servicesTimeline
      .from(".services-title", {
        opacity: 0,
        ease: "power1.inOut",
      })
      .from(".services-p", {
        opacity: 0,
        ease: "expo.out",
      })
      .fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.2, ease: "power1.inOut" },
        "-=0.5"
      );
  });

  const services = [
    {
      title: "Generator Installation",
      desc: "Professional setup and installation for homes, offices, and industries to ensure reliable and safe operation.",
      icon: <Wrench className="w-8 h-8 text-[var(--bg-dark)]" />,
    },
    {
      title: "Maintenance & Repairs",
      desc: "Keep your generators in top condition with regular maintenance and fast repair services from certified technicians.",
      icon: <Zap className="w-8 h-8 text-[var(--bg-dark)]" />,
    },
    {
      title: "Delivery & Logistics",
      desc: "Nationwide delivery and logistics to ensure your power systems arrive safely and on time, wherever you are.",
      icon: <Truck className="w-8 h-8 text-[var(--bg-dark)]" />,
    },
  ];

  return (
    <section
      id="services"
      className="relative bg-[var(--panel-blue)] text-[var(--white)] py-20 px-6 md:px-16 lg:px-24"
    >
      <div className="absolute top-0 inset-0 bg-[var(--bg-dark)]/80"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="services-title text-5xl md:text-7xl font-bold text-[var(--accent-yellow)] mb-4">
            <span className="text-white">Our</span> Services
          </h2>
          <p className="services-p text-[var(--muted-gray)] max-w-2xl mx-auto">
            Beyond selling generators, LJA Power provides full-service energy
            solutions to keep your systems running smoothly.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-[var(--card-blue)] rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[var(--accent-yellow)] rounded-full p-4">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-[var(--muted-gray)] text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
