// Styling
import "../../assets/css/Footer.css";

// Icons
import { Facebook } from "lucide-react";

// Routing
import { Link } from "react-router-dom";

// Optimized Logo (Resized to 96px for 48px display)
import logoFooter from "../../assets/images/lja-logo.png?w=96&format=webp";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white relative bg-[linear-gradient(to_bottom_left,_#0c2430_15%,_#145d77_85%)] backdrop-blur-sm py-12 px-6 md:px-16 lg:px-24 border-t border-[var(--accent-yellow)]/20 shadow-[0_-4px_15px_rgba(245,236,25,0.05)]">
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-6">
        {/* LEFT CONTENT: Brand & Social */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <div className="flex items-center gap-3">
            <img
              className="size-12 rounded-full border border-[var(--accent-yellow)]/30 shadow-md object-contain bg-white/5"
              src={logoFooter}
              width="48"
              height="48"
              alt="LJA Power Limited Co. Logo"
              loading="lazy"
            />
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide leading-none">
                LJA Power Limited Co.
              </h2>
              <p className="text-[var(--muted-gray)] text-xs font-medium tracking-wider mt-1">
                Your Trusted Energy Lifeline ⚡
              </p>
            </div>
          </div>

          <div className="flex-center w-full">
            <Link
              to="https://www.facebook.com/profile.php?id=61572436091637"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 transition-transform hover:scale-110"
              aria-label="Visit our Facebook Page"
            >
              <Facebook className="text-white bg-[#1877F2] p-1.5 size-9 rounded-full" />
            </Link>
          </div>
        </div>

        {/* MIDDLE: Quick Links */}
        <div className="text-center md:text-left">
          <div className="font-heading font-bold uppercase tracking-wider text-[var(--accent-yellow)] mb-4">
            Quick Links
          </div>

          <ul className="text-[var(--muted-gray)] text-sm space-y-2">
            {[
              { name: "About Us", to: "/about" },
              { name: "Products", to: "/products" },
              { name: "Services", to: "/services" },
              {
                name: "Our Works",
                to: "/our-works",
              },
              { name: "Contact Us", to: "/contacts" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* MIDDLE: Services */}
        <div className="text-center md:text-left">
          <div className="font-heading font-bold uppercase tracking-wider text-[var(--accent-yellow)] mb-4">
            Services
          </div>

          <ul className="text-[var(--muted-gray)] text-sm space-y-2">
            {[
              "Site Assessment & Planning",
              "Expert Installation (ATS)",
              "Preventive Maintenance",
              "24/7 Emergency Support",
              "Parts & Service Availability",
              "Compliance Assistance",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* RIGHT CONTENT: Locations & Legal */}
        <div className="text-center md:text-right space-y-4">
          <div className="space-y-1">
            <p className="text-[var(--muted-gray)] text-sm">
              © {currentYear} LJA Power Limited Co.{" "}
              <br className="hidden md:block" />
              All rights reserved.
            </p>

            <div className="flex justify-center md:justify-end gap-2 text-xs text-gray-500 flex-wrap">
              {[
                {
                  name: "Cagayan de Oro",
                  url: "https://maps.app.goo.gl/LJvxpcku46hKaceZA",
                },
                {
                  name: "Bukidnon",
                  url: "https://maps.app.goo.gl/LJvxpcku46hKaceZA",
                }, // Verify URL
                {
                  name: "Zamboanga Del Sur",
                  url: "https://maps.app.goo.gl/LJvxpcku46hKaceZA",
                }, // Verify URL
              ].map((loc, i) => (
                <span key={loc.name} className="flex items-center">
                  {i > 0 && <span className="mr-2 text-gray-700">•</span>}
                  <Link
                    className="hover:text-[var(--accent-yellow)] transition-colors"
                    to={loc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${loc.name} branch on Google Maps`}
                  >
                    {loc.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>

          <p className="text-[var(--muted-gray)] text-xs">
            Need assistance?{" "}
            <Link
              to="/contacts"
              className="text-[var(--accent-yellow)] font-semibold hover:underline transition"
            >
              Contact us today.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
