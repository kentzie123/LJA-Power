// SEO
import { Helmet } from "react-helmet";

// Style
import "../assets/css/pages/ContactPage.css";

// UI
import ContactCard from "../components/ui/ContactCard";

// Component
import ContactForm from "../components/layout/ContactForm";
import PageNavigationHeader from "../components/layout/PageNavigationHeader";

// Routing
import { Link } from "react-router-dom";

// Icons
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";

// Data
import { contacts } from "../../constants";

// Hooks
import { useState } from "react";

const ContactPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(contacts[0]);

  const setLocation = (contact) => {
    setSelectedLocation(contact);
  };

  return (
    <div className="bg-[var(--bg-dark)]">
      {/* SEO */}
      <Helmet>
        <title>Contact LJA Power Limited Co. | Expert Power Solutions</title>
        <meta
          name="description"
          content="Get in touch with LJA Power Limited Co. for inquiries, support, or expert guidance on power generation solutions. Contact us via phone, email, or visit our locations."
        />

        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Contact LJA Power Limited Co. | Expert Power Solutions"
        />
        <meta
          property="og:description"
          content="Get in touch with LJA Power Limited Co. for inquiries, support, or expert guidance on power generation solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lja-power.com/contacts" />
        <meta
          property="og:image"
          content="https://www.lja-power.com/images/contacts-hero-page"
        />
        <meta property="og:image:alt" content="Contact LJA Power Limited Co." />
        <link rel="canonical" href="https://lja-power.com/contacts" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "LJA Power Limited Co.",
            url: "https://lja-power.com",
            logo: "https://lja-power.com/images/lja-logo.png",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+639157495102",
                email: "lja.ljapowerlimitedco@gmail.com",
                contactType: "Customer Service",
                areaServed: "PH",
              },
            ],
            sameAs: [
              "https://www.facebook.com/profile.php?id=61572436091637",
              "https://www.facebook.com/marc88fyi",
              "https://www.facebook.com/profile.php?id=61576825362962",
            ],
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <PageNavigationHeader
        h1="Contact"
        h1Yellow="Us"
        p="Get in touch with our team for expert guidance on your power generation needs."
        id="contact-page-hero"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contacts" }]}
      />

      {/* Main Content */}
      <div className="mx-auto container text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-30 p-6 lg:p-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <div className="text-center md:text-left">
              <h2 className="text-6xl font-bold text-[var(--accent-yellow)] mb-4">
                Get in Touch
              </h2>
              <p className="text-[var(--muted-gray)] text-lg">
                Reach us through any of the options below — we’d love to hear
                from you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-8 mt-6">
              {/* Phone */}
              <div className="group cursor-pointer">
                <a
                  href="tel:+639157495102"
                  className="flex flex-col items-center space-y-2"
                  aria-label="Call LJA Power Limited Co."
                >
                  <div className="bg-[var(--accent-yellow)]/10 group-hover:bg-[var(--accent-yellow)]/20 p-4 rounded-full transition-all">
                    <Phone className="w-8 h-8 text-[var(--accent-yellow)]" />
                  </div>
                  <span className="text-white font-semibold">Phone</span>
                  <span className="text-[var(--muted-gray)] text-sm">
                    (+63) 915-749-5102
                  </span>
                </a>
              </div>

              {/* Email */}
              <div className="group cursor-pointer">
                <a
                  href="mailto:lja.ljapowerlimitedco@gmail.com"
                  className="flex flex-col items-center space-y-2"
                  aria-label="Email LJA Power Limited Co."
                >
                  <div className="bg-[var(--accent-yellow)]/10 group-hover:bg-[var(--accent-yellow)]/20 p-4 rounded-full transition-all">
                    <Mail className="w-8 h-8 text-[var(--accent-yellow)]" />
                  </div>
                  <span className="text-white font-semibold">Email</span>
                  <span className="text-[var(--muted-gray)] text-sm">
                    lja.ljapowerlimitedco@gmail.com
                  </span>
                </a>
              </div>

              {/* Locations */}
              <div
                onClick={() =>
                  document
                    .querySelector("#contact-locations")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group cursor-pointer flex flex-col items-center space-y-2"
              >
                <div className="bg-[var(--accent-yellow)]/10 group-hover:bg-[var(--accent-yellow)]/20 p-4 rounded-full transition-all">
                  <MapPin className="w-8 h-8 text-[var(--accent-yellow)]" />
                </div>
                <span className="text-white font-semibold">All Locations</span>
                <span className="text-[var(--muted-gray)] text-sm">
                  View on map
                </span>
              </div>
            </div>
          </div>

          {/* Locations & Map */}
          <div
            id="contact-locations"
            className="col-span-full grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4 mt-12"
          >
            <div className="col-span-full lg:col-span-2">
              <h3 className="text-center md:text-left text-4xl text-[var(--accent-yellow)] font-bold">
                Our Locations
              </h3>
              <div className="grid grid-cols-1 gap-5 overflow-y-scroll h-150 py-4">
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

            {/* Google Map */}
            <div className="col-span-full lg:col-span-4 rounded-2xl overflow-hidden shadow-lg border border-[var(--bg-dark)] h-160">
              <iframe
                title="LJA Power Location"
                src={selectedLocation.map}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
