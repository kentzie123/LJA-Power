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
        "-=0.5"
      )
      .from(
        routeRef.current,
        {
          yPercent: 100,
          opacity: 0,
          duration: 1,
          ease: "back.inOut",
        },
        "-=0.5"
      );
  }, [id]);

  return (
    <>
      <div
        className="absolute top-0 left-0 h-[400px] w-full bg-[var(--accent-yellow)]/70 translate-y-1.5 z-0"
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
        <div className="absolute top-0 inset-0 bg-[var(--bg-dark)]/80" />

        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <h1
            ref={titleRef}
            className="text-4xl md:text-7xl font-bold text-[var(--accent-yellow)]"
          >
            <span className="text-white">{h1}</span> {h1Yellow}
          </h1>

          <p ref={pRef} className="max-w-2xl mx-auto text-[var(--muted-gray)] text-xs md:text-base">
            {p}
          </p>

          <div ref={routeRef} className="text-white">
            <ul className="flex-center gap-1 w-full max-w-md mx-auto text-sm md:text-base">
              {breadcrumbs
                .map((crumb, index) => (
                  <li
                    key={`crumb-${index}`}
                    className={`flex items-center ${
                      index === breadcrumbs.length - 1
                        ? ""
                        : "hover:link hover:text-[var(--accent-yellow)]"
                    }`}
                  >
                    {index < breadcrumbs.length - 1 ? (
                      <Link to={crumb.to}>{crumb.label}</Link>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                  </li>
                ))
                .flatMap((li, index) =>
                  index < breadcrumbs.length - 1
                    ? [
                        li,
                        <li
                          key={`chevron-${index}`}
                          className="flex items-center"
                        >
                          <ChevronRight className="text-[var(--accent-yellow)]" />
                        </li>,
                      ]
                    : [li]
                )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageNavigationHeader;
