import logoNav from "../../assets/images/lja-logo.png?w=80&format=webp";

import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Twirl as Hamburger } from "hamburger-react";
import { navItems } from "../../../constants";

// Removed: preloadPage function and import { LAZY_PAGE_IMPORTS }

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close navbar if click outside (This logic is kept)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Mobile Navigation */}
      <nav
        ref={mobileNavRef}
        aria-label="Mobile Navigation"
        className={`block lg:hidden px-4 py-8 fixed top-[72px] left-0 bg-backdrop w-full transition-all duration-500 ease-in-out z-40 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-[-130%] opacity-0"
        }`}
      >
        <ul className="space-y-4">
          {navItems.map((link) => (
            <li className="relative group" key={link.href}>
              <NavLink
                to={link.href}
                onClick={() => setOpen(false)}
                // Removed: onMouseEnter preload
                className={({ isActive }) =>
                  `relative text-lg font-heading uppercase tracking-wide transition-all duration-300 transform after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[var(--accent-yellow)] after:transition-all after:duration-300 ${
                    isActive
                      ? "text-[var(--accent-yellow)] after:w-full"
                      : "text-white hover:text-[var(--accent-yellow)] after:w-0 hover:after:w-full"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <NavLink
          className="cursor-pointer btn-yellow mt-6 w-fit font-heading font-bold uppercase tracking-wider block"
          to="/contacts"
          onClick={() => setOpen(false)}
        >
          Get a Quote
        </NavLink>
      </nav>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <nav className="flex items-center justify-between px-4 lg:px-8 py-3 bg-backdrop text-white shadow-md">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <img
              className="rounded-full w-10 h-10 object-contain group-hover:rotate-12 transition-transform duration-500"
              src={logoNav}
              width="40"
              height="40"
              alt="LJA Power Limited Co. Logo"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="font-heading text-xl font-bold tracking-wide text-white group-hover:text-[var(--accent-yellow)] transition-colors">
                LJA POWER
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400">
                LIMITED CO.
              </span>
            </div>
          </NavLink>

          <div className="h-full flex items-center">
            {/* Desktop Menu */}
            <ul className="lg:flex hidden items-center gap-8">
              {navItems.map((link) => (
                <li
                  className="relative group flex flex-col items-center justify-center"
                  key={link.href}
                >
                  <NavLink
                    to={link.href}
                    // Removed: onMouseEnter preload
                    className={({ isActive }) =>
                      `relative text-sm font-heading uppercase tracking-wider transition-all duration-300 transform after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[var(--accent-yellow)] after:transition-all after:duration-300 ${
                        isActive
                          ? "text-[var(--accent-yellow)] -translate-y-[2px] after:w-full after:translate-y-[4px]"
                          : "text-white hover:text-[var(--accent-yellow)] hover:-translate-y-[2px] after:w-0 hover:after:w-full hover:after:translate-y-[4px]"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile Toggle */}
            <button
              ref={hamburgerRef}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="lg:hidden block text-white hover:text-[var(--accent-yellow)] transition-colors ml-4"
            >
              <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
            </button>
          </div>

          {/* Desktop CTA */}
          <NavLink
            to="/contacts"
            // Removed: onMouseEnter preload
            className="lg:block hidden btn-yellow font-heading font-bold uppercase tracking-wider text-sm px-6 py-2 shadow-lg hover:shadow-[var(--accent-yellow)]/20"
          >
            Get a Quote
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
