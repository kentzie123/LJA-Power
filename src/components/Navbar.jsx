import { navItems } from "../../constants";

// Lucide Icons
import { Menu } from "lucide-react";

const Navbar = () => {
  console.log(navItems);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-[#0C2430] text-white z-50">
      <a href="#home" className="flex items-center gap-2">
        <img
          className="rounded-full size-10"
          src="/images/lja-logo.webp"
          alt="LJA Power Limited Co. company logo"
        />
        <h2 className="text-2xl font-[700] text-[#f5ec19]">LJA POWER</h2>
      </a>

      <div>
        <ul className="lg:flex hidden items-center gap-6">
          {navItems.map((link) => (
            <li key={link.href}>
              <a
                className="hover:text-gray-200 font-[500]"
                href={`#${link.href}`}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact">
              <button className="btn btn-warning text-white">Contact Us</button>
            </a>
          </li>
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
              
              <h2 className="text-2xl font-[700] text-[#f5ec19]">LJA POWER</h2>
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

              <a className="ms-2 mt-2" href="#contact">
                <button className="btn btn-warning text-white">
                  Contact Us
                </button>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
