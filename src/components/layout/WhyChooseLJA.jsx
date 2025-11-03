// Icons
import { Zap, ShieldCheck, Clock } from "lucide-react";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Data
const ad = [
  {
    icon: <Zap className="w-8 h-8 text-[var(--bg-dark)]" />,
    title: "Reliable Power",
    desc: "Industry-leading generators that deliver consistent power when you need it most, ensuring your operations never skip a beat.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[var(--bg-dark)]" />,
    title: "Quality Assurance",
    desc: "All our generators meet the highest industry standards with comprehensive warranties and quality certifications.",
  },
  {
    icon: <Clock className="w-8 h-8 text-[var(--bg-dark)]" />,
    title: "24/7 Support",
    desc: "Round-the-clock technical support and emergency service to keep your power systems running smoothly.",
  },
];

const WhyChooseLJA = () => {
  useGSAP(() => {
    const whyChooseUsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#whyChooseUs",
        start: "top 60%",
      },
    });

    whyChooseUsTimeline
      .from(".wcu-title", {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "power2.inOut",
      })
      .from(
        ".wcu-p",
        {
          opacity: 0,
          yPercent: 100,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      .fromTo(
        ".wcu-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.2, ease: "power2.inOut" }, "-=0.2"
      );
  });

  return (
    <section
      id="whyChooseUs"
      className="min-h-dvh bg-[var(--bg-dark)] py-30 lg:px-16 px-6"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="wcu-title text-5xl md:text-7xl font-bold text-[var(--accent-yellow)] mb-4">
            <span className="text-white">Why Choose</span> LJA Power
          </h2>
          <p className="wcu-p text-[var(--muted-gray)] max-w-2xl mx-auto">
            Trusted generator solutions built on years of expertise and a strong
            commitment to reliability and excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-25">
          {ad.map((item, index) => (
            <div
              key={index}
              className="wcu-card bg-[var(--card-blue)] rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[var(--accent-yellow)] rounded-full p-4">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--muted-gray)] text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLJA;
