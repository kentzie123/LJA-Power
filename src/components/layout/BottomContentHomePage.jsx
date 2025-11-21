// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Routing
import { Link } from "react-router-dom";

// Icons
import { MoveRight } from "lucide-react";

const BottomContentHomePage = () => {
  useGSAP(() => {
    const btmHPTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#btm-hp",
        start: "top 70%",
      },
    });

    btmHPTimeline
      .from(".btm-hp-header", {
        opacity: 0,
        yPercent: 100,
        ease: "power2.inOut",
      })
      .from(
        ".btm-hp-p",
        {
          opacity: 0,
          yPercent: 100,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      .from(".btm-hp-btn", {
        opacity: 0,
        xPercent: 100,
        ease: "power2.inOut",
        stagger: 0.2,
      });
  });

  return (
    <section
      id="btm-hp"
      className="bg-[var(--accent-yellow)] text-[var(--bg-dark)]"
    >
      <div className="section-container flex-center flex-col py-22 space-y-4  text-center md:text-left">
        <div className="btm-hp-header text-3xl font-bold">
          Ready to Power Your Business?
        </div>
        <p className="btm-hp-p">
          Get in touch with our experts to find the perfect generator solution
          for your needs
        </p>
        <div className="flex items-center gap-2">
          <Link
            to="/contacts"
            className="btm-hp-btn px-6 py-3 bg-[var(--panel-blue)] rounded text-white text-sm"
          >
            Contact Us Today
          </Link>
          <Link to="/products" className="btm-hp-btn btn-yellow">
            Browse our generators
            <span>
              <MoveRight className="ms-2" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BottomContentHomePage;
