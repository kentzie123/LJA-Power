// Responsive Images
import abt5SrcSet from "../../assets/images/abt5.webp?w=400;800;1200&format=webp&as=srcset";
import abt4SrcSet from "../../assets/images/abt4.webp?w=400;800;1200&format=webp&as=srcset";
import abt3SrcSet from "../../assets/images/abt3.webp?w=400;800;1200&format=webp&as=srcset";
import abt2SrcSet from "../../assets/images/abt2.webp?w=400;800;1200&format=webp&as=srcset";
import abt1SrcSet from "../../assets/images/abt1.webp?w=400;800;1200&format=webp&as=srcset";

// Fallbacks
import abt5Fallback from "../../assets/images/abt5.webp?w=1200&format=webp";
import abt4Fallback from "../../assets/images/abt4.webp?w=1200&format=webp";
import abt3Fallback from "../../assets/images/abt3.webp?w=1200&format=webp";
import abt2Fallback from "../../assets/images/abt2.webp?w=1200&format=webp";
import abt1Fallback from "../../assets/images/abt1.webp?w=1200&format=webp";

import "../../assets/css/About.css";

import SplitText from "gsap/SplitText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const About = () => {
  useGSAP(() => {
    const aboutSplitText = SplitText.create(".about-title", {
      type: "words",
    });

    const aboutScrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    aboutScrollTimeline
      .from(aboutSplitText.words, {
        opacity: 0,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.02,
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.04,
        },
        "-=0.5"
      );
  });

  return (
    <section
      id="about"
      className="min-h-dvh bg-[var(--bg-dark)] text-[var(--white)] py-30"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 mb-16 gap-8">
          <div className="col-span-8 space-y-4">
            {/* 1. Tagline: Oswald + Wide Tracking */}
            <div className="font-heading text-[var(--accent-yellow)] text-lg md:text-xl font-bold uppercase tracking-[0.2em]">
              - Who We Are
            </div>

            {/* 2. Main Heading: Oswald + Tight Tracking + Uppercase */}
            <h2 className="about-title font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--white)] uppercase tracking-tight leading-[1.1]">
              LJA Power Limited Co.
              <br />
              — Your Trusted
              <br />
              <span className="text-[#0d9dd1]">Energy Lifeline ⚡</span>
            </h2>
          </div>

          <div className="col-span-4 space-y-6 flex flex-col justify-end">
            {/* 3. Body Text: Inter (Default) for readability */}
            <p className="text-[var(--white)] text-base md:text-lg leading-relaxed text-gray-300">
              LJA Power Limited Co is a trusted name in the power generation
              industry, providing high-quality diesel generators and reliable
              energy solutions across the Philippines. We don’t just sell
              generators — we deliver peace of mind.
            </p>

            <div className="mt-3 border-l-4 border-[var(--accent-yellow)] pl-4">
              <p className="text-base text-[var(--muted-gray)] italic font-medium">
                “Empowering businesses and communities with reliable energy
                solutions.”
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE GRID */}
        {/* Added 'loading="lazy"' to all images to fix Lighthouse warning! */}

        <div className="top-grid grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          <div className="md:col-span-3 relative group overflow-hidden rounded-md">
            <img
              src={abt3Fallback}
              srcSet={abt3SrcSet}
              sizes="(max-width: 768px) 100vw, 25vw"
              alt="Industrial Generator Setup"
              loading="lazy"
              className="object-cover w-full h-full relative z-10 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2430]/80 to-transparent z-20 pointer-events-none"></div>
          </div>

          <div className="md:col-span-6 relative group overflow-hidden rounded-md">
            <img
              src={abt2Fallback}
              srcSet={abt2SrcSet}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="LJA Power Technicians"
              loading="lazy"
              className="object-cover w-full h-full relative z-10 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2430]/80 to-transparent z-20 pointer-events-none"></div>
          </div>

          <div className="md:col-span-3 relative group overflow-hidden rounded-md">
            <img
              src={abt4Fallback}
              srcSet={abt4SrcSet}
              sizes="(max-width: 768px) 100vw, 25vw"
              alt="Generator Maintenance"
              loading="lazy"
              className="object-cover w-full h-full relative z-10 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2430]/80 to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>

        <div className="bottom-grid grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 relative group overflow-hidden rounded-md">
            <img
              src={abt1Fallback}
              srcSet={abt1SrcSet}
              sizes="(max-width: 768px) 100vw, 66vw"
              alt="LJA Power Office"
              loading="lazy"
              className="object-cover w-full h-full relative z-10 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2430]/80 to-transparent z-20 pointer-events-none"></div>
          </div>

          <div className="md:col-span-4 relative group overflow-hidden rounded-md">
            <img
              src={abt5Fallback}
              srcSet={abt5SrcSet}
              sizes="(max-width: 768px) 100vw, 33vw"
              alt="Delivery Truck"
              loading="lazy"
              className="object-cover w-full h-full relative z-10 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2430]/80 to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
