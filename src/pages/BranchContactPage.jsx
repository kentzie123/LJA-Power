// BranchContactPage.jsx

import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Style
import "../assets/css/pages/ContactPage.css";

// Components
import ContactCard from "../components/ui/ContactCard";
import ContactForm from "../components/layout/ContactForm";
import PageNavigationHeader from "../components/layout/PageNavigationHeader";

// Icons
import { Phone, Mail, MapPin } from "lucide-react";

// Data
import { contacts } from "../../constants";

const BranchContactPage = () => {
  const { branchSlug } = useParams(); // Get slug from URL
  const branchData = contacts.find((c) => c.slug === branchSlug) || contacts[0];

  const [selectedLocation, setSelectedLocation] = useState(branchData);

  useEffect(() => {
    setSelectedLocation(branchData);
  }, [branchSlug]);

  const setLocation = (contact) => {
    setSelectedLocation(contact);
  };

  return (
    <div className="bg-[var(--bg-dark)]">
      {/* SEO */}
      <Helmet>
        <title>{branchData.seo.title}</title>
        <meta name="description" content={branchData.seo.description} />
        <link
          rel="canonical"
          href={`https://lja-power.com/branches/${branchData.slug}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={branchData.seo.title} />
        <meta property="og:description" content={branchData.seo.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://lja-power.com/branches/${branchData.slug}`}
        />
        <meta
          property="og:image"
          content="https://www.lja-power.com/images/contacts-hero-page"
        />
        <meta property="og:image:alt" content={branchData.seo.title} />
      </Helmet>

      {/* Hero Section */}
      <PageNavigationHeader
        h1={`Contact ${branchData.office}`}
        h1Yellow=""
        p={branchData.seo.content}
        id="contact-page-hero"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Contacts", to:"/contacts" },
          { label: branchData.office },
        ]}
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
                  href={`tel:${branchData.number}`}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="bg-[var(--accent-yellow)]/10 group-hover:bg-[var(--accent-yellow)]/20 p-4 rounded-full transition-all">
                    <Phone className="w-8 h-8 text-[var(--accent-yellow)]" />
                  </div>
                  <span className="text-white font-semibold">Phone</span>
                  <span className="text-[var(--muted-gray)] text-sm">
                    {branchData.number}
                  </span>
                </a>
              </div>

              {/* Email */}
              <div className="group cursor-pointer">
                <a
                  href="mailto:lja.ljapowerlimitedco@gmail.com"
                  className="flex flex-col items-center space-y-2"
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
                title={`${branchData.office} Location`}
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

export default BranchContactPage;
