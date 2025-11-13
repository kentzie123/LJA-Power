// Styling
import "../../assets/css/Footer.css";

// Icons
import { Facebook } from "lucide-react";

// Routing
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white relative bg-[linear-gradient(to_bottom_left,_#0c2430_15%,_#145d77_85%)] backdrop-blur-sm py-10 px-6 md:px-16 lg:px-24 border-t border-[var(--accent-yellow)]/20 shadow-[0_-4px_15px_rgba(245,236,25,0.05)]">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3">
            <img
              className="size-12 rounded-full border border-[var(--accent-yellow)]/30 shadow-md"
              src="/images/lja-logo.webp"
              alt="LJA Power Limited Co. company logo"
            />
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                LJA Power Limited Co.
              </h2>
              <p className="text-[var(--muted-gray)] text-sm">
                Your Trusted Energy Lifeline ⚡
              </p>
            </div>
          </div>

          <Link
            to="https://www.facebook.com/profile.php?id=61572436091637"
            target="_blank"
            className="mx-auto mt-4 cursor-pointer"
          >
            <Facebook className="text-white bg-blue-500 p-1 size-8" />
          </Link>
        </div>

        <div className="text-center md:text-left">
          <div className="font-semibold">Quick Links</div>

          <ul className="quick-links text-[var(--muted-gray)] text-sm space-y-2 mt-4">
            <li>
              <Link to="/about">Home</Link>
            </li>
            <li>
              <Link to="/about">Abous Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/project-and-testimonies">Projects & Testimonies</Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <div className="font-semibold">Services</div>

          <ul className="text-[var(--muted-gray)] text-sm space-y-2 mt-4">
            <li>Installation</li>
            <li>Maintenance</li>
            <li>Repair & Service</li>
            <li>Consultation</li>
          </ul>
        </div>

        {/* RIGHT CONTENT */}
        <div className="text-center md:text-right space-y-1">
          <p className="text-[var(--muted-gray)] text-sm">
            © {new Date().getFullYear()} LJA Power Limited Co. All rights
            reserved.
          </p>
          <p className="text-gray-500 text-xs space-x-1">
            <Link
              className="hover:text-[var(--accent-yellow)]"
              to="https://maps.app.goo.gl/LJvxpcku46hKaceZA"
              target="_blank"
            >
              Cagayan de Oro
            </Link>
            •{" "}
            <Link
              className="hover:text-[var(--accent-yellow)]"
              to="https://maps.app.goo.gl/LJvxpcku46hKaceZA"
              target="_blank"
            >
              Bukidnon
            </Link>
            •{" "}
            <Link
              className="hover:text-[var(--accent-yellow)]"
              to="https://maps.app.goo.gl/LJvxpcku46hKaceZA"
              target="_blank"
            >
              Zamboanga Del Sur
            </Link>
          </p>
          <p className="text-[var(--muted-gray)] text-xs mt-2">
            Need assistance?{" "}
            <Link
              to="/contacts"
              className="text-[var(--accent-yellow)] hover:underline transition"
            >
              Contact us today.
            </Link>
          </p>
        </div>
      </div>

      {/* <div className="divider"></div>

      <div className="flex-center text-sm">
        © {new Date().getFullYear()} LJA Power Limited Co. All rights reserved.
      </div> */}
    </footer>
  );
};

export default Footer;
