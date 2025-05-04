import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import "./navigation.css";
import classnames from "classnames";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleSubMenu = (index: number) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  useEffect(() => {
    if (isMenuOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isMenuOpen]);

  return (
    <>
      <button
        ref={hamburgerRef}
        className="hamburger"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="side-menu"
        aria-label="Open navigation menu"
      >
        ☰
      </button>
      <nav
        id="side-menu"
        className={`side-menu ${isMenuOpen ? "open" : ""}`}
        role="navigation"
        aria-hidden={!isMenuOpen}
      >
        {/* Close Button */}
        <button
          className="close-button"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        >
          ×
        </button>

        <ul>
          <li>
            <Link to="/" ref={firstLinkRef} tabIndex={isMenuOpen ? 0 : -1}>
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSubMenu(1);
              }}
              aria-controls="services-submenu"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Carriers
            </button>
            <ul
              aria-expanded={activeSubMenu === 1}
              id="services-submenu"
              className={classnames("sub-menu", { "sub-menu-open": activeSubMenu === 1, "sub-menu-closed": activeSubMenu !== 1})}
              aria-hidden={activeSubMenu !== 1}
            >
              <li>
                <Link to="/carriers">Search</Link>
              </li>
              <li>
                <Link to="/carriers/new">New</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
