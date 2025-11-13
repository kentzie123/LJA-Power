// Icons
import { Zap, ShieldCheck, Clock } from "lucide-react";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Hooks
import { useRef } from "react";

// UI
import InfoCard from "../ui/InfoCard";

// Data
const adData = [
  {
    icon: <Zap className="w-8 h-8 text-[var(--accent-yellow)]" />,
    title: "Reliable Power",
    desc: "Industry-leading generators that deliver consistent power when you need it most, ensuring your operations never skip a beat.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[var(--accent-yellow)]" />,
    title: "Quality Assurance",
    desc: "All our generators meet the highest industry standards with comprehensive warranties and quality certifications.",
  },
  {
    icon: <Clock className="w-8 h-8 text-[var(--accent-yellow)]" />,
    title: "24/7 Support",
    desc: "Round-the-clock technical support and emergency service to keep your power systems running smoothly.",
  },
];

const WhyChooseLJA = () => {
  const adRef = useRef();

  useGSAP(() => {
    const adCards = gsap.utils.toArray(adRef.current.children);

    adCards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        opacity: 0,
        yPercent: 100,
        ease: "power2.inOut",
        delay: 0.2 * i,
      });
    });

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
      );
  });

  return (
    <section
      id="whyChooseUs"
      className="bg-[var(--bg-dark)] py-30 lg:px-16 px-6"
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

        <div
          ref={adRef}
          className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-25"
        >
          {adData.map((item, index) => (
            <InfoCard
              key={index}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLJA;
