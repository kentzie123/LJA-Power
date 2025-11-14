// Style
import "../../assets/css/pages/HomePage.css";

// GSAP
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Routing
import { Link } from "react-router-dom";

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
        "-=0.8"
      )
      .from(
        ".hero-btns",
        {
          opacity: 0,
          duration: 1,
          yPercent: 100,
          ease: "expo.out",
        },
        "-=0.8"
      );
  });

  return (
    <section id="hero" className="relative md:min-h-dvh pt-30 pb-10 md:pb-0">
      <div className="absolute top-0 inset-0 bg-[var(--bg-dark)]/80" />
      <div className="container mx-auto px-6 text-white space-y-6">
        <div className="uppercase text-[var(--accent-yellow)] font-semibold tracking-wide">
          <h2 className="will-appear uppercase">
            Powering Progress, Comfort, and Connection ⚡️
          </h2>
        </div>

        <h1 className="will-appear text-4xl md:text-6xl lg:text-8xl text-[#0d9dd1] font-bold">
          Reliable <br />
          Diesel Generators <br />& Energy Solutions <br />
          Across the Philippines
        </h1>

        <p className="will-appear-p text-sm lg:text-base">
          We don't just sell generators — we deliver peace of mind, <br />
          keeping your lights on, your business running, and your life moving
          forward.
        </p>

        <div className="hero-btns flex flex-wrap gap-4">
          <Link className="btn-yellow !px-7" to="products">
            View our products
          </Link>

          <Link
            className="btn-backdrop font-semibold px-7 py-3 rounded-md text-sm"
            to="contacts"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
