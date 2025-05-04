import React, { useState, useEffect, useRef } from "react";
import "./navigation.css";

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
            <a href="/" ref={firstLinkRef} tabIndex={isMenuOpen ? 0 : -1}>
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleSubMenu(1);
              }}
              aria-expanded={activeSubMenu === 1}
              aria-controls="services-submenu"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Services
            </a>
            <ul
              id="services-submenu"
              className="sub-menu"
              aria-hidden={activeSubMenu !== 1}
            >
              <li>
                <a href="/">Web Design</a>
              </li>
              <li>
                <a href="/">Development</a>
              </li>
              <li>
                <a href="/">SEO</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/" tabIndex={isMenuOpen ? 0 : -1}>
              About
            </a>
          </li>
          <li>
            <a href="/" tabIndex={isMenuOpen ? 0 : -1}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
