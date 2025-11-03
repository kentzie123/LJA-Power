import { Phone, Mail, MapPin, Facebook } from "lucide-react";

import "../assets/css/Contact.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Contact = () => {
  useGSAP(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
      },
    });

    contactTimeline
      .from(".contact-title", {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: "power1.inOut",
      })
      .from(
        ".contact-p",
        {
          opacity: 0,
          yPercent: 100,
          duration: 1,
          ease: "power1.inOut",
        },
        "-=0.5"
      )
      .fromTo(
        ".contact-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.2, ease: "power1.inOut" },
        "-=0.5"
      )
      .from(".main-contact", {
        opacity: 0,
        y: 40,
        ease: "power1.inOut",
      });
  });

  const contacts = [
    {
      icon: Phone,
      title: "Phone",
      details: ["09157495102", "09271156751"],
      action: () => (window.location.href = "tel:09157495102"),
    },
    {
      icon: Mail,
      title: "Email",
      details: ["ljapowerlimitedco@gmail.com"],
      action: () =>
        (window.location.href = "mailto:ljapowerlimitedco@gmail.com"),
    },
    {
      icon: MapPin,
      title: "Locations",
      details: ["Cagayan de Oro Branch", "Bukidnon Branch", "CDO Branch"],
      action: () =>
        toast({
          title: "Visit us at any of our branches!",
          description: "Contact us for exact addresses",
        }),
    },
    {
      icon: Facebook,
      title: "Social Media",
      details: ["LJA Power Limited Co"],
      action: () =>
        (window.location.href =
          "https://www.facebook.com/profile.php?id=61576825362962"),
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-dvh bg-gradient-to-tl from-[#1b6f8d] to-[#0c2430] py-20 px-6 md:px-16 lg:px-24"
    >
      <div className="container mx-auto space-y-6">
        <div>
          <h2 className="contact-title text-5xl text-center md:text-7xl font-bold text-[var(--accent-yellow)] mb-4">
            <span className="text-white">Get in</span> Touch
          </h2>
          <p className="contact-p text-[var(--muted-gray)] text-center">
            Ready to power your future? Contact us today!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 items-stretch">
          {contacts.map((contact, i) => (
            <div
              key={i}
              onClick={contact.action}
              className="contact-card border border-[var(--accent-yellow)]/20 cursor-pointer rounded-3xl bg-[var(--card-blue)]/80 p-6 space-y-3"
            >
              <div className="rounded-xl bg-[var(--accent-yellow)]/10 flex-center size-12">
                <contact.icon className="text-[var(--accent-yellow)]" />
              </div>

              <div className="text-2xl font-bold text-white">
                {contact.title}
              </div>

              <div className="space-y-1">
                {contact.details.map((detail, i) => (
                  <p
                    key={i}
                    className="text-sm text-[var(--muted-gray)] font-medium"
                  >
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="main-contact bg-[var(--accent-yellow)]/5 border border-[var(--accent-yellow)]/30 rounded-2xl p-8 md:p-12 flex-center flex-col">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h3>
          <p className="text-[var(--muted-gray)] mb-8 text-lg">
            Contact us now for a free consultation and quote!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div
              onClick={() => (window.location.href = "tel:09157495102")}
              className="contact-btn-shadowed"
            >
              <Phone className="size-5" /> Call Now
            </div>

            <div
              onClick={() =>
                (window.location.href = "mailto:ljapowerlimitedco@gmail.com")
              }
              className="contact-btn"
            >
              <Mail className="size-5" /> Email Us
            </div>
          </div>
        </div>

        {/* GOOGLE MAP */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg border border-[var(--bg-dark)]">
          <iframe
            title="LJA Power Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8048.935808040912!2d125.12302837951177!3d8.157291748942105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ff8e63da4a3273%3A0xbad9922b746df7bb!2sSayre%20Hwy%2C%20Malaybalay%20City%2C%20Bukidnon!5e0!3m2!1sen!2sph!4v1697406755042!5m2!1sen!2sph"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
