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
    <section
      id="hero"
      className="relative pt-30 pb-10 md:pb-30 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Video */}
      <video
        className="absolute object-cover w-full h-full top-0 left-0"
        src="/videos/mndesigns.mp4"
        muted
        autoPlay
        playsInline
        loop
        poster="/images/hero1.webp"
        aria-hidden="true"
        tabIndex="-1"
      ></video>

      {/* Dark Overlay for text readability */}
      <div className="absolute top-0 inset-0 bg-[var(--bg-dark)]/85" />

      <div className="flex flex-col section-container text-white space-y-6 relative z-10">
        {/* 1. TAGLINE: Oswald look best with wide spacing (Industrial Label style) */}
        <div className="font-heading text-[var(--accent-yellow)] font-bold tracking-[0.2em] uppercase text-sm md:text-base">
          <h2 className="will-appear">
            Powering Progress, Comfort, and Connection ⚡️
          </h2>
        </div>

        {/* 2. MAIN HEADING: Oswald looks best TIGHT and TALL */}
        <h1 className="will-appear font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
          <span className="text-[#0d9dd1]">Reliable</span> <br />
          {/* I made 'Diesel Generators' white to pop against the blue/yellow */}
          <span className="text-white">Diesel Generators</span> <br />
          <span className="text-[#0d9dd1]">& Energy Solutions</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Across the Philippines
          </span>
        </h1>

        {/* 3. PARAGRAPH: Keep as Inter (Default) for readability */}
        <p className="will-appear-p text-gray-300 text-base lg:text-xl max-w-2xl font-light leading-relaxed">
          We don't just sell generators — we deliver peace of mind,{" "}
          <br className="hidden md:block" />
          keeping your lights on, your business running, and your life moving
          forward.
        </p>

        {/* 4. BUTTONS: Oswald works great for buttons (Call to Action) */}
        <div className="hero-btns flex flex-wrap gap-4 pt-4">
          <Link
            className="btn-yellow !px-8 !py-4 font-heading font-bold uppercase tracking-wider text-lg shadow-lg hover:shadow-[var(--accent-yellow)]/50 transition-all"
            to="/products"
          >
            View our products
          </Link>

          <Link
            className="btn-backdrop !px-8 !py-4 font-heading font-bold uppercase tracking-wider text-lg border-2 border-white/20 hover:border-white transition-all"
            to="/contacts"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
