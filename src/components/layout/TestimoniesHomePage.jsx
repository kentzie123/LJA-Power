// UI
import TestimoniesCard from "../ui/TestimoniesCard";

// Data
import { testimonies } from "../../../constants";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Hooks
import { useRef } from "react";

const TestimoniesHomePage = () => {
  const testimonyHpRef = useRef();

  useGSAP(() => {
    const testimonyCards = gsap.utils.toArray(testimonyHpRef.current.children);

    testimonyCards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%"
        },
        opacity: 0,
        yPercent: 100,
        delay: 0.2 * i,
        ease: "power2.inOut"
      })
    })

    const testimonyHomePageTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#testimony-hp",
        start: "top center",
      },
    });

    testimonyHomePageTimeline
      .from(".test-hp-header", {
        yPercent: 100,
        opacity: 0,
        ease: "power2.inOut",
      })
      .from(
        ".test-hp-p",
        {
          yPercent: 100,
          opacity: 0,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
  });

  return (
    <section id="testimony-hp" className="bg-[var(--card-blue)] text-white">
      <div className="mx-auto container px-4 py-22">
        <div className="text-center">
          <div className="test-hp-header text-3xl font-bold">
            What Our Clients Say
          </div>

          <p className="test-hp-p text-[var(--muted-gray)] text-sm mt-4">
            Trusted by businesses
          </p>
        </div>

        <div
          ref={testimonyHpRef}
          className="grid grid-col-1 lg:grid-cols-3 gap-5 lg:gap-10 mt-12"
        >
          {testimonies.map((testimony, i) => (
            <TestimoniesCard key={i} testimony={testimony} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniesHomePage;
