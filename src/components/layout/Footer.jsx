import React from "react";
import { Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[linear-gradient(to_bottom_left,_#0c2430_15%,_#145d77_85%)] backdrop-blur-sm py-10 px-6 md:px-16 lg:px-24 border-t border-[var(--accent-yellow)]/20 shadow-[0_-4px_15px_rgba(245,236,25,0.05)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3">
            <img
              className="size-12 rounded-full border border-[var(--accent-yellow)]/30 shadow-md"
              src="/images/lja-logo.webp"
              alt="LJA Power Limited Co. company logo"
            />
            <div>
              <h2 className="text-white text-xl md:text-2xl font-bold">
                LJA Power Limited Co.
              </h2>
              <p className="text-[var(--muted-gray)] text-sm">
                Your Trusted Energy Lifeline ⚡
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="text-center md:text-right space-y-1">
          <p className="text-[var(--muted-gray)] text-sm">
            © {new Date().getFullYear()} LJA Power Limited Co. All rights
            reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Cagayan de Oro • Bukidnon • CDO Branch
          </p>
          <p className="text-[var(--muted-gray)] text-xs mt-2">
            Need assistance?{" "}
            <a
              href="#contact"
              className="text-[var(--accent-yellow)] hover:underline transition"
            >
              Contact us today.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
