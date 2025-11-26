import { Helmet } from "react-helmet";

// Components
import PageNavigationHeader from "../components/layout/PageNavigationHeader";
import InfoCard from "../components/ui/InfoCard";

// Styling
import "../assets/css/pages/AboutUsPage.css";

// Icons
import { Target, Eye, Award } from "lucide-react";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AboutUsPage = () => {
  const aboutUsData = [
    {
      title: "Our Mission",
      desc: "Deliver reliable and innovative power solutions that empower businesses and communities.",
      icon: <Target className="w-8 h-8 text-[var(--accent-yellow)]" />,
    },
    {
      title: "Our Vision",
      desc: "Be the leading power solutions provider recognized for quality, innovation, and customer satisfaction.",
      icon: <Eye className="w-8 h-8 text-[var(--accent-yellow)]" />,
    },
    {
      title: "Our Values",
      desc: "Integrity, Reliability, Innovation, Customer Focus, Sustainability, Excellence.",
      icon: <Award className="w-8 h-8 text-[var(--accent-yellow)]" />,
    },
  ];

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
    const mainHeaderTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-header",
        start: "top 60%",
        scrub: 2,
      },
    });

    mainHeaderTimeline
      .from(".abt-float-left", { y: 40, duration: 1, ease: "power1.inOut" })
      .from(
        ".abt-float-right",
        { y: -40, duration: 1, ease: "power1.inOut" },
        "-=1"
      )
      .fromTo(
        ".right-quote",
        {
          y: -20,
          duration: 1,
          ease: "power1.inOut",
        },
        { y: 0, rotate: 5 },
        "-=1"
      )
      .fromTo(
        ".left-quote",
        {
          y: 50,
          duration: 1,
          ease: "power1.inOut",
        },
        { y: 0, rotate: 5 },
        "-=1"
      );
  });

  return (
    <div className="bg-[var(--bg-dark)] text-white">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About Us | LJA Power Limited Co.</title>
        <meta
          name="description"
          content="Learn about LJA Power Limited Co., a leading provider of reliable power solutions. Discover our mission, vision, values, and why businesses choose us."
        />
        <meta
          name="keywords"
          content="LJA Power, power solutions, generators, mission, vision, values, reliable energy, business solutions"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.lja-power.com/about" />

        {/* Open Graph / Social Media */}
        <meta property="og:title" content="About Us | LJA Power Limited Co." />
        <meta
          property="og:description"
          content="Learn about LJA Power Limited Co., a leading provider of reliable power solutions. Discover our mission, vision, values, and why businesses choose us."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lja-power.com/about" />
        <meta
          property="og:image"
          content="https://www.lja-power.com/images/abt2.webp"
        />
        <meta
          property="og:image:alt"
          content="LJA Power Limited Co. Office and Team"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "LJA Power Limited Co.",
            url: "https://www.lja-power.com",
            logo: "https://www.lja-power.com/images/lja-logo.png",
            sameAs: [
              "https://www.facebook.com/profile.php?id=61572436091637",
              "https://www.facebook.com/marc88fyi",
              "https://www.facebook.com/profile.php?id=61576825362962",
            ],
            description:
              "LJA Power Limited Co. is a trusted provider of reliable and efficient energy solutions for homes, businesses, and industries.",
            mission:
              "Deliver reliable and innovative power solutions that empower businesses and communities.",
            vision:
              "Be the leading power solutions provider recognized for quality, innovation, and customer satisfaction.",
          })}
        </script>
      </Helmet>

      <PageNavigationHeader
        h1="About"
        h1Yellow="LJA Power Limited Co."
        p="Leading the power generation industry with innovative solutions and unwavering commitment to excellence"
        id="about-page-hero"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      <div className="section-container p-6 lg:p-12 space-y-20">
        {/* Company Info */}
        <section className="main-header grid grid-cols-1 lg:grid-cols-2 gap-40 lg:gap-10 py-22">
          <div className="relative">
            <img
              className="right-quote absolute size-30 md:size-auto top-[-80px] right-0 z-0 opacity-50"
              src="/images/right-quote.png"
              alt="right-quote"
            />
            <img
              className="left-quote absolute size-30 md:size-auto bottom-[-110px] md:bottom-[-130px] lg:bottom-[-80px] xl:bottom-10 left-0 z-0 opacity-50"
              src="/images/left-quote.png"
              alt="right-quote"
            />
            <div className="relative">
              <h2 className="text-6xl text-center lg:text-left font-bold mb-4">
                Our <span className="text-[var(--accent-yellow)]">Company</span>
              </h2>
              <div className="space-y-4 text-[var(--muted-gray)]">
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
                <p>
                  Beyond our services, LJA Power Limited Co. values
                  sustainability and community development, implementing
                  environmentally responsible practices and supporting local
                  communities.
                </p>
              </div>
            </div>
          </div>

          <div className="place-self-center relative my-16 lg:my-0">
            <img
              className="relative rounded-md shadow-[0_25px_50px_-12px_var(--panel-blue)] z-10"
              src="/images/about-main-image.webp"
              alt="LJA Power Limited Co. Office"
            />
            <img
              className="abt-float-right absolute top-[-80px] right-[-40px] md:top-[-100px] md:right-[-150px] lg:top-[-115px] lg:right-[-60px] object-contain h-45 md:h-90 lg:h-80 rounded-lg shadow-[0_25px_50px_-12px_var(--panel-blue)] z-0
"
              src="/images/about-float-right.webp"
              alt="image floating right"
            />
            <img
              className="abt-float-left absolute bottom-[-80px] left-[-40px] md:bottom-[-150px] md:left-[-150px] lg:bottom-[-100px] lg:left-[-30px] object-contain h-40 md:h-90 lg:h-70 rounded-lg shadow-[0_25px_50px_-12px_var(--panel-blue)] z-20
"
              src="/images/abt3.webp"
              alt="image floating left"
            />
          </div>
        </section>
      </div>

      {/* Mission, Vision, Values */}
      <section className="">
        {/* First Row */}
        <div className="grid grid-col-1 md:grid-cols-3 overflow-hidden">
          <div className="bg-[var(--card-blue)] flex-center p-14">
            <div className="space-y-6">
              <div className="text-5xl">
                <div className="">Our</div>
                <div className="font-bold">Mission.</div>
              </div>
              <p className="text-lg">
                Deliver reliable and innovative power solutions that empower
                businesses and communities.
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <img
              className="object-cover h-full w-full aspect-[5/6]"
              src="/images/abt3.webp"
              alt=""
            />
          </div>
          <div className="bg-[var(--card-blue)] flex-center p-14">
            <div className="space-y-6">
              <div className="text-5xl">
                <div className="">Our</div>
                <div className="font-bold">Vision.</div>
              </div>
              <p className="text-lg">
                Be the leading power solutions provider recognized for quality,
                innovation, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-col-1 md:grid-cols-3">
          <div className="overflow-hidden">
            <img
              className="object-cover h-full w-full aspect-[5/6]"
              src="/images/abt4.webp"
              alt=""
            />
          </div>
          <div className="bg-[var(--accent-yellow)] text-black flex-center p-14">
            <div className="space-y-6">
              <div className="text-5xl">
                <div className="">Our</div>
                <div className="font-bold">Values.</div>
              </div>
              <p className="text-lg">
                Integrity, Reliability, Innovation, Customer Focus,
                Sustainability, Excellence.
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <img
              className="object-cover h-full w-full aspect-[5/6]"
              src="/images/about-float-right.webp"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Why Businesses Choose Us */}
      <section className="bg-[var(--card-blue)]">
        <div className="mx-auto container p-12">
          <h2 className="text-center text-4xl font-bold mb-10">
            Why Businesses Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center md:text-left">
            {whyChooseUsData.map((item, i) => (
              <div key={i} className="px-4 border-l-2 border-[var(--accent-yellow)]">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-[var(--muted-gray)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
