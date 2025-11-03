import { navItems } from "../../../constants";

// Routing
import { NavLink } from "react-router-dom";

// Lucide Icons
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-4 py-3 bg-backdrop text-white">
        <a href="#home" className="flex items-center gap-2">
          <img
            className="rounded-full size-8 lg:size-9"
            src="/images/lja-logo.webp"
            alt="LJA Power Limited Co. company logo"
          />
          <h2 className="lg:text-xl font-[600]">LJA Power Limited Co.</h2>
        </a>

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

          <div className="drawer text-black block lg:hidden">
            <input
              id="nav-menu-mobile"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="nav-menu-mobile" className="btn drawer-button">
                <Menu />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="nav-menu-mobile"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <a href="#home" className="flex items-center gap-2">
                <h2 className="text-2xl font-[700] text-[#f5ec19]">
                  LJA POWER
                </h2>
              </a>

              <ul className="menu bg-base-200 min-h-full w-80 p-4 bg-gradient-to-tl from-[#1b6f8d] to-[#0c2430] text-white">
                {/* Sidebar content here */}
                <a href="#home" className="flex items-center gap-2 mb-3">
                  <img
                    className="rounded-full size-10"
                    src="/images/lja-logo.webp"
                    alt="logo"
                  />
                  <h2 className="text-2xl font-[700] !text-[var(--accent-yellow)]">
                    LJA POWER
                  </h2>
                </a>

                {navItems.map((link) => (
                  <li key={link.href}>
                    <a className="font-[500] py-2" href={`#${link.href}`}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <NavLink to="/contact" className="lg:block hidden">
          <button className="btn-yellow">Get a Quote</button>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
