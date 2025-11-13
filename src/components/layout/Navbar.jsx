// Data
import { navItems } from "../../../constants";

// Routing
import { NavLink } from "react-router-dom";

// Lucide Icons
import { Menu } from "lucide-react";

// Hamburger bar component
import { Twirl as Hamburger } from "hamburger-react";

// Hooks
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      {/* Mobile Navigation */}
      <div
        className={`block md:hidden fixed top-[72px] left-0 bg-[var(--bg-dark)] w-full transition-all duration-500 ease-in-out z-40 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-[-130%] opacity-0"
        }`}
      >
        <ul className="space-y-4 px-4 py-8">
          {navItems.map((link) => (
            <li className="relative group" key={link.href}>
              <NavLink
                to={link.href}
                onClick={()=> setOpen(false)}
                className={({ isActive }) =>
                  `relative text-md transition-all duration-300 transform after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-[var(--accent-yellow)] after:transition-all after:duration-300 ${
                    isActive
                      ? "text-[var(--accent-yellow)] after:w-full"
                      : "text-white group-hover:text-[var(--accent-yellow)] after:w-0 group-hover:after:w-full"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <NavLink to="/contacts">
            <button className="btn-yellow">Get a Quote</button>
          </NavLink>
        </ul>
      </div>

      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex items-center justify-between px-4 py-3 bg-backdrop text-white">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              className="rounded-full size-8 lg:size-9"
              src="/images/lja-logo.webp"
              alt="LJA Power Limited Co. company logo"
            />
            <h2 className="lg:text-xl font-[600]">LJA Power Limited Co.</h2>
          </NavLink>

          <div className="h-[100%]">
            <ul className="lg:flex hidden items-center gap-7">
              {navItems.map((link) => (
                <li
                  className="relative group flex flex-col items-center justify-center"
                  key={link.href}
                >
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `relative text-sm transition-all duration-300 transform after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[var(--accent-yellow)] after:transition-all after:duration-300 ${
                        isActive
                          ? "text-[var(--accent-yellow)] -translate-y-[5px] after:w-full after:translate-y-[5px]"
                          : "text-white group-hover:text-[var(--accent-yellow)] group-hover:-translate-y-[5px] after:w-0 group-hover:after:w-full group-hover:after:translate-y-[5px]"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="md:hidden block">
              <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>
          </div>

          <NavLink to="/contacts" className="lg:block hidden">
            <button className="btn-yellow">Get a Quote</button>
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
