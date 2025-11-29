// SEO
import SEO from "../components/layout/SEO";

// Style
import "../assets/css/pages/ContactPage.css";

// UI
import ContactCard from "../components/ui/ContactCard";

// Component
import ContactForm from "../components/layout/ContactForm";
import PageNavigationHeader from "../components/layout/PageNavigationHeader";

// Icons
import { Phone, Mail, MapPin } from "lucide-react";

// Hooks
import { useState } from "react";

// Data
import { contacts } from "../../constants";

const ContactPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(contacts[0]);

  const setLocation = (contact) => {
    setSelectedLocation(contact);
  };

  return (
    <div className="bg-[var(--bg-dark)] text-white">
      {/* 3. SEO Component Implementation */}
      <SEO
        title="Contact LJA Power | Generator Experts Philippines"
        description="Contact LJA Power for diesel generators, ATS installation & maintenance. Call +639157495102 or email. Multiple locations across Philippines."
        url="https://lja-power.com/contacts"
        image="https://lja-power.com/images/contact-hero.webp"
      />

      {/* 4. FINAL CLEANED JSON-LD (No specific address data) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact LJA Power Limited Co.",
          description:
            "Contact page for LJA Power Limited Co. - diesel generator suppliers and power solutions provider in Philippines",
          url: "https://lja-power.com/contacts",
          mainEntity: {
            "@type": "Organization",
            name: "LJA Power Limited Co.",
            // ✅ CONTACT POINT ADDED TO ORGANIZATION (Best Practice)
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+639157495102",
              contactType: "customer service",
              areaServed: "PH",
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: "https://lja-power.com/contacts",
              },
            },
          },
        })}
      </script>

      {/* Hero Section */}
      <PageNavigationHeader
        h1="Contact"
        h1Yellow="Us"
        p="Get in touch with our team for expert guidance on your power generation needs."
        id="contact-page-hero"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contacts" }]}
      />

      {/* Main Content */}
      <div className="section-container px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT: Contact Form (Assuming ContactForm.jsx is fully functional) */}
          <div className="bg-[var(--card-blue)] p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent-yellow)]/5 rounded-full blur-3xl group-hover:bg-[var(--accent-yellow)]/10 transition-colors duration-500 pointer-events-none" />
            <ContactForm />
          </div>

          {/* RIGHT: Contact Info (Styled with Oswald) */}
          <div className="flex flex-col justify-center">
            <div className="text-center md:text-left mb-12">
              <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-none mb-6">
                Get in{" "}
                <span className="text-[var(--accent-yellow)]">Touch</span>
              </h2>
              <p className="text-[var(--muted-gray)] text-lg leading-relaxed">
                Reach us through any of the options below — we’d love to hear
                from you. Our team is ready to provide expert assistance.
              </p>
            </div>

            {/* Quick Contact Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Phone */}
              <a
                href="tel:+639157495102"
                className="group flex flex-col items-center p-6 bg-[var(--bg-dark)]/50 rounded-lg border border-white/5 hover:border-[var(--accent-yellow)] hover:-translate-y-1 transition-all duration-300"
                aria-label="Call LJA Power Limited Co."
              >
                <div className="mb-4 bg-[var(--accent-yellow)]/10 p-4 rounded-full group-hover:bg-[var(--accent-yellow)] transition-colors duration-300">
                  <Phone className="size-6 text-[var(--accent-yellow)] group-hover:text-black transition-colors" />
                </div>
                <span className="font-heading font-bold uppercase tracking-wide text-sm mb-1">
                  Phone
                </span>
                <span className="text-[var(--muted-gray)] text-xs text-center">
                  (+63) 915-749-5102
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:lja.ljapowerlimitedco@gmail.com"
                className="group flex flex-col items-center p-6 bg-[var(--bg-dark)]/50 rounded-lg border border-white/5 hover:border-[var(--accent-yellow)] hover:-translate-y-1 transition-all duration-300"
                aria-label="Email LJA Power Limited Co."
              >
                <div className="mb-4 bg-[var(--accent-yellow)]/10 p-4 rounded-full group-hover:bg-[var(--accent-yellow)] transition-colors duration-300">
                  <Mail className="size-6 text-[var(--accent-yellow)] group-hover:text-black transition-colors" />
                </div>
                <span className="font-heading font-bold uppercase tracking-wide text-sm mb-1">
                  Email
                </span>
                <span className="text-[var(--muted-gray)] text-xs text-center truncate w-full px-2">
                  lja.ljapowerlimitedco@gmail.com
                </span>
              </a>

              {/* Locations (Scroll) */}
              <button
                onClick={() =>
                  document
                    .querySelector("#contact-locations")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex flex-col items-center p-6 bg-[var(--bg-dark)]/50 rounded-lg border border-white/5 hover:border-[var(--accent-yellow)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="mb-4 bg-[var(--accent-yellow)]/10 p-4 rounded-full group-hover:bg-[var(--accent-yellow)] transition-colors duration-300">
                  <MapPin className="size-6 text-[var(--accent-yellow)] group-hover:text-black transition-colors" />
                </div>
                <span className="font-heading font-bold uppercase tracking-wide text-sm mb-1">
                  Visit Us
                </span>
                <span className="text-[var(--accent-yellow)] text-xs underline decoration-dotted">
                  View Map Below
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* --- MAP SECTION --- */}
        <div
          id="contact-locations"
          className="mt-24 pt-12 border-t border-white/10"
        >
          <h3 className="text-center md:text-left text-3xl font-heading font-bold uppercase tracking-wide text-white mb-8">
            Our <span className="text-[var(--accent-yellow)]">Locations</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* List (ContactCard handles display) */}
            <div className="lg:col-span-4 h-[500px] overflow-y-scroll pr-2 custom-scrollbar">
              <div className="space-y-4">
                {contacts.map((contact, i) => (
                  <ContactCard
                    key={i}
                    contact={contact}
                    setLocation={setLocation}
                    selectedContact={selectedLocation}
                  />
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-8 h-[500px] rounded-xl overflow-hidden shadow-2xl border border-[var(--accent-yellow)]/20 relative group">
              <iframe
                title="LJA Power Location"
                src={selectedLocation.map}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-500 group-hover:filter-none"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
