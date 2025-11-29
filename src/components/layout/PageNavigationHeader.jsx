// Routing
import { Link } from "react-router-dom";

// Icons
import { ChevronRight } from "lucide-react";

// GSAP
import { useEffect, useRef } from "react";
import gsap from "gsap";

const PageNavigationHeader = ({
  h1,
  h1Yellow,
  p,
  id,
  breadcrumbs = [{ label: "Home", to: "/" }, { label: "Product" }],
}) => {
  const titleRef = useRef(null);
  const pRef = useRef(null);
  const routeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: `#${id}`, start: "top center" },
    });

    tl.from(titleRef.current, {
      xPercent: -50,
      opacity: 0,
      ease: "power2.inOut",
      duration: 1,
    })
      .from(
        pRef.current,
        {
          xPercent: 50,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        "-=0.7"
      )
      .from(
        routeRef.current,
        {
          yPercent: 100,
          opacity: 0,
          duration: 1,
          ease: "back.inOut",
        },
        "-=0.7"
      );
  }, [id]);

  return (
    <>
      {/* Yellow Shape Background */}
      <div
        className="absolute top-0 left-0 h-[400px] w-full bg-[var(--accent-yellow)]/70 translate-y-1.5 z-0 pointer-events-none"
        style={{
          clipPath: "polygon(100% 60%, 50% 100%, 0 60%, 0 0, 100% 0)",
        }}
      />

      <section
        id={id}
        className="relative h-100 overflow-hidden flex-center z-10"
        style={{
          clipPath: "polygon(100% 60%, 50% 100%, 0 60%, 0 0, 100% 0)",
        }}
      >
        <div className="absolute top-0 inset-0 bg-[var(--bg-dark)]/90" />

        <div className="relative max-w-7xl mx-auto text-center space-y-6 px-4">
          {/* Main Title: Industrial Typography */}
          <h1
            ref={titleRef}
            className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none text-[var(--accent-yellow)]"
          >
            <span className="text-white">{h1}</span> {h1Yellow}
          </h1>

          <p
            ref={pRef}
            className="max-w-2xl mx-auto text-gray-300 text-sm md:text-lg font-light leading-relaxed"
          >
            {p}
          </p>

          {/* Breadcrumbs Navigation */}
          <nav
            aria-label="Breadcrumb"
            ref={routeRef}
            className="text-white pt-2"
          >
            <ul className="flex flex-wrap justify-center items-center gap-2 w-full max-w-md mx-auto text-xs md:text-sm font-medium tracking-wide uppercase">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <li key={`crumb-${index}`} className="flex items-center">
                    {/* Add Chevron before item (except the first one) */}
                    {index > 0 && (
                      <ChevronRight className="size-4 text-[var(--accent-yellow)] mx-2" />
                    )}

                    {isLast ? (
                      <span
                        className="text-[var(--accent-yellow)]"
                        aria-current="page"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        to={crumb.to}
                        className="hover:text-[var(--accent-yellow)] transition-colors border-b border-transparent hover:border-[var(--accent-yellow)]"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
};

export default PageNavigationHeader;
