import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  useGSAP(() => {
    const heroContentSplit = SplitText.create(".will-appear", {
      type: "words",
    });

    const heroScrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top center",
      },
    });

    heroScrollTimeline
      .from(heroContentSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.02,
      })
      .from(
        ".will-appear-p",
        {
          opacity: 0,
          duration: 1,
          yPercent: 100,
          ease: "expo.out",
        },
        "-=0.5"
      )
      .from(
        ".hero-contact-btn",
        {
          opacity: 0,
          duration: 1,
          yPercent: 100,
          ease: "expo.out",
        },
        "-=0.5"
      );

    // Parallax effect for background image
    gsap.to(".parallax-bg", {
      yPercent: 90,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex-center text-center md:text-left overflow-hidden"
    >
      <img
        src="/images/hero1.jpg"
        className="absolute inset-0 w-full h-full object-cover parallax-bg"
        alt="Hero background"
      />
      <div className="absolute top-0 inset-0 bg-[var(--bg-dark)]/80"></div>
      <div className="relative z-10 container mx-auto px-6 text-white space-y-6">
        <div className="uppercase text-[var(--accent-yellow)] font-semibold tracking-wide">
          <div className="will-appear uppercase">
            Powering Progress, Comfort, and Connection ⚡️
          </div>
        </div>

        <div className="will-appear text-6xl md:text-7xl lg:text-8xl text-[#0d9dd1] font-bold">
          Reliable <br />
          Diesel Generators <br />& Energy Solutions <br />
          Across the Philippines
        </div>

        <p className="will-appear-p">
          We don't just sell generators — we deliver peace of mind, <br />
          keeping your lights on, your business running, and your life moving
          forward.
        </p>

        <button className="hero-contact-btn btn btn-warning text-white">
          CONTACT US
        </button>
      </div>
    </section>
  );
};

export default Hero;
