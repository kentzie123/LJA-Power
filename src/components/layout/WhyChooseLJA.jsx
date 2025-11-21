// Icons
import { HardHat, Settings, Wrench } from "lucide-react";

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
    icon: <HardHat className="w-8 h-8 text-[var(--accent-yellow)]" />,
    title: "Expertise and Experience",
    desc: "Top-quality generator installation with extensive industry experience and reliability.",
  },
  {
    icon: <Settings className="w-8 h-8 text-[var(--accent-yellow)]" />,
    title: "Customized Solutions",
    desc: "Tailored generator installations for efficiency, performance, and cost-effectiveness.",
  },
  {
    icon: <Wrench className="w-8 h-8 text-[var(--accent-yellow)]" />,
    title: "Comprehensive Service",
    desc: "Complete service from consultation to commissioning, with professionalism and meticulous attention to detail.",
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
      className="bg-[var(--bg-dark)] py-30"
    >
      <div className="section-container">
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
