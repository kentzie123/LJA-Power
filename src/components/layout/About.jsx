import "../../assets/css/About.css"

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
      className="min-h-dvh bg-[var(--bg-dark)] text-[var(--white) py-30"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 mb-16">
          <div className="col-span-8">
            <div className="text-[var(--accent-yellow)] text-xl font-semibold uppercase tracking-wide">
              - Who We Are
            </div>

            <h2 className="about-title text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--white)] leading-12 md:leading-14 lg:leading-17">
              LJA Power Limited Co.
              <br />
              — Your Trusted
              <br />
              Energy Lifeline ⚡
            </h2>
          </div>
          <div className="col-span-4 space-y-6">
            <p className="text-[var(--white)] leading-relaxed">
              LJA Power Limited Co is a trusted name in the power generation
              industry, providing high-quality diesel generators and reliable
              energy solutions across the Philippines. We don’t just sell
              generators — we deliver peace of mind, keeping your lights on,
              your business running, and your life moving forward.{" "}
            </p>{" "}
            <div className="mt-3 border-l-2 border-[var(--accent-yellow)] pl-3">
              <p className="text-sm text-[var(--muted-gray)] italic">
                “Empowering businesses and communities with reliable energy
                solutions.”
              </p>
            </div>
          </div>
        </div>

        <div className="top-grid">
          <div className="md:col-span-3">
            <div className="noisy" />
            <img src="/images/abt3.webp" alt="grid-img-1" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_#145d77_100%)]"></div>
          </div>

          <div className="md:col-span-6">
            <img src="/images/abt2.webp" alt="grid-img-2" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_#145d77_100%)]"></div>
          </div>

          <div className="md:col-span-3">
            <img src="/images/abt4.webp" alt="grid-img-5" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_#145d77_100%)]"></div>
          </div>
        </div>

        <div className="bottom-grid">
          <div className="md:col-span-8">
            <img src="/images/abt1.webp" alt="grid-img-3" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_#145d77_100%)]"></div>
          </div>

          <div className="md:col-span-4">
            <img src="/images/abt5.webp" alt="grid-img-4" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_#145d77_100%)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
