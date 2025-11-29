// SEO
import SEO from "../components/layout/SEO";

// Components
import PageNavigationHeader from "../components/layout/PageNavigationHeader";

// Styling
import "../assets/css/pages/AboutUsPage.css";

// Icons
import { CheckCircle2, Target, Eye, Award } from "lucide-react";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger to be safe
gsap.registerPlugin(ScrollTrigger);

const AboutUsPage = () => {
  const whyChooseUsData = [
    {
      title: "Expert Team",
      desc: "Certified technicians and engineers dedicated to delivering reliable power solutions and unmatched service.",
    },
    {
      title: "Reliable Products",
      desc: "High-quality generators and power systems that ensure continuous productivity and safety for your business.",
    },
    {
      title: "24/7 Support",
      desc: "Round-the-clock technical assistance and emergency service to keep your operations running smoothly.",
    },
    {
      title: "Innovative Solutions",
      desc: "Cutting-edge technologies designed to optimize energy efficiency and meet your evolving power needs.",
    },
    {
      title: "Customer Focus",
      desc: "We prioritize your satisfaction, providing personalized solutions tailored to your business requirements.",
    },
    {
      title: "Proven Track Record",
      desc: "Trusted by businesses across the region for consistent performance, reliability, and excellence.",
    },
  ];

  useGSAP(() => {
    // 1. Main Header Animation
    const mainHeaderTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-header",
        start: "top 80%", // Trigger slightly earlier for better visibility
      },
    });

    mainHeaderTimeline
      .from(".abt-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
      .from(
        ".abt-content p",
        {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

    // 2. Parallax Effect for Images
    gsap.to(".abt-float-right", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".main-header",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".abt-float-left", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".main-header",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // 3. FIXED: Why Choose Us Cards (Using fromTo)
    // This prevents cards from getting stuck at opacity: 0
    gsap.fromTo(
      ".wcu-card",
      {
        opacity: 0,
        y: 50,
      }, // Start State
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#why-choose-us",
          start: "top 85%", // Starts as soon as the section touches bottom of screen
          toggleActions: "play none none reverse", // Re-plays if you scroll up and down
        },
      } // End State
    );
  });

  return (
    <div className="bg-[var(--bg-dark)] text-white overflow-hidden">
      {/* SEO */}
      <SEO
        title="About LJA Power | Mission & Vision"
        description="Learn about LJA Power Limited Co.'s mission to deliver reliable power solutions in Philippines. Discover our vision for quality generators & 24/7 support."
        url="https://lja-power.com/about"
        image="https://lja-power.com/images/about-main-image.webp"
      />

      <PageNavigationHeader
        h1="About"
        h1Yellow="LJA Power Limited Co."
        p="Leading the power generation industry with innovative solutions and unwavering commitment to excellence"
        id="about-page-hero"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      {/* SECTION 1: COMPANY INFO */}
      <div className="section-container px-6 lg:px-12 py-20 lg:py-32">
        <section className="main-header grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="relative order-2 lg:order-1">
            <img
              className="right-quote absolute w-24 opacity-10 -top-16 right-0 pointer-events-none"
              src="/images/right-quote.png"
              alt=""
              aria-hidden="true"
            />

            <div className="relative z-10">
              <h2 className="abt-title font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none mb-8">
                Our <span className="text-[var(--accent-yellow)]">Company</span>
              </h2>

              <div className="abt-content space-y-6 text-[var(--muted-gray)] text-lg leading-relaxed">
                <p>
                  LJA Power Limited Co. is a trusted provider of reliable and
                  efficient energy solutions for homes, businesses, and
                  industries. We are committed to delivering high-quality power
                  services with a focus on safety, innovation, and customer
                  satisfaction.
                </p>
                <p>
                  Our services include power generation equipment,
                  installations, maintenance, and energy consulting, all
                  tailored to meet the unique needs of each client.
                </p>

                <div className="flex items-start gap-4 p-4 bg-[var(--card-blue)] rounded-lg border-l-4 border-[var(--accent-yellow)]">
                  <Award className="text-[var(--accent-yellow)] size-8 shrink-0" />
                  <p className="text-white text-sm italic">
                    "Values sustainability and community development,
                    implementing environmentally responsible practices."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Composition */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border-4 border-[var(--bg-dark)]">
              <img
                className="w-full max-w-md object-cover"
                src="/images/about-main-image.webp"
                alt="LJA Power Limited Co. Office"
                loading="lazy"
              />
            </div>

            {/* Floating Images */}
            <img
              className="abt-float-right absolute -top-12 -right-12 w-48 lg:w-64 rounded-lg shadow-xl z-0 opacity-80 border-2 border-[var(--card-blue)]"
              src="/images/about-float-right.webp"
              alt="Generator Detail"
              loading="lazy"
            />
            <img
              className="abt-float-left absolute -bottom-12 -left-12 w-40 lg:w-56 rounded-lg shadow-xl z-20 border-2 border-[var(--accent-yellow)]"
              src="/images/abt3.webp"
              alt="Technician Working"
              loading="lazy"
            />
          </div>
        </section>
      </div>

      {/* SECTION 2: MISSION / VISION / VALUES */}
      <section className="bg-white/5 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Mission */}
          <div className="bg-[var(--card-blue)] p-14 flex flex-col justify-center group hover:bg-[#1a5f7a] transition-colors duration-300">
            <Target className="size-12 text-[var(--accent-yellow)] mb-6" />
            <div className="font-heading text-4xl font-bold uppercase tracking-tight mb-4">
              Our <br />
              <span className="text-[var(--accent-yellow)]">Mission</span>
            </div>
            <p className="text-[var(--muted-gray)] group-hover:text-white transition-colors">
              Deliver reliable and innovative power solutions that empower
              businesses and communities.
            </p>
          </div>

          <div className="relative group overflow-hidden h-80 md:h-auto">
            <img
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              src="/images/abt3.webp"
              alt="Mission"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[var(--accent-yellow)]/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Vision */}
          <div className="bg-[var(--card-blue)] p-14 flex flex-col justify-center group hover:bg-[#1a5f7a] transition-colors duration-300 border-l border-white/5">
            <Eye className="size-12 text-[var(--accent-yellow)] mb-6" />
            <div className="font-heading text-4xl font-bold uppercase tracking-tight mb-4">
              Our <br />
              <span className="text-[var(--accent-yellow)]">Vision</span>
            </div>
            <p className="text-[var(--muted-gray)] group-hover:text-white transition-colors">
              Be the leading power solutions provider recognized for quality,
              innovation, and customer satisfaction.
            </p>
          </div>

          <div className="relative group overflow-hidden h-80 md:h-auto md:order-last lg:order-none">
            <img
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              src="/images/abt4.webp"
              alt="Vision"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[var(--card-blue)]/30 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Values */}
          <div className="bg-[var(--accent-yellow)] text-[var(--bg-dark)] p-14 flex flex-col justify-center">
            <Award className="size-12 text-[var(--bg-dark)] mb-6" />
            <div className="font-heading text-4xl font-bold uppercase tracking-tight mb-4">
              Our <br />
              <span>Values</span>
            </div>
            <p className="font-medium text-[var(--bg-dark)]/80">
              Integrity, Reliability, Innovation, Customer Focus,
              Sustainability, Excellence.
            </p>
          </div>

          <div className="relative group overflow-hidden h-80 md:h-auto">
            <img
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              src="/images/about-float-right.webp"
              alt="Values"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <section id="why-choose-us" className="bg-[var(--card-blue)] py-24">
        <div className="section-container px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Why Businesses{" "}
              <span className="text-[var(--accent-yellow)]">Choose Us</span>
            </h2>
            <div className="h-1 w-20 bg-[var(--accent-yellow)] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsData.map((item, i) => (
              <div
                key={i}
                className="wcu-card group p-8 bg-[var(--bg-dark)]/50 border border-white/5 rounded-xl hover:bg-[var(--bg-dark)] hover:border-[var(--accent-yellow)] transition-all duration-300 hover:-translate-y-2 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[var(--accent-yellow)]/10 p-3 rounded-lg group-hover:bg-[var(--accent-yellow)] transition-colors duration-300">
                    <CheckCircle2 className="size-6 text-[var(--accent-yellow)] group-hover:text-[var(--bg-dark)]" />
                  </div>
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wide group-hover:text-[var(--accent-yellow)] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[var(--muted-gray)] group-hover:text-gray-300 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
