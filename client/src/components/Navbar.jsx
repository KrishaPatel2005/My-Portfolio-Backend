import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../index.css";

// auth helpers
import { getUser, logout } from "../auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser(); // null or {name, email, role}

  /* -------------------- Smooth Scroll Helper -------------------- */
  const goToSection = (hash) => {
    setMenuOpen(false);

    // If we are on admin route, first go back to "/"
    if (location.pathname.startsWith("/admin")) {
      navigate("/");

      // Wait a tiny bit for the home sections to render
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }, 400);
      return;
    }

    // If already on home, just scroll
    const target = document.querySelector(hash);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  /* -------------------- Load Theme -------------------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  /* -------------------- Scroll Shadow -------------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------------------- Detect Active Section -------------------- */
  useEffect(() => {
    const handleActiveSection = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "home";

      sections.forEach((section) => {
        const id = section.getAttribute("id");
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const y = window.scrollY;

        if (y >= top && y < top + height) {
          current = id === "hero" ? "home" : id;
        }
      });

      setActiveSection(current);
    };

    // Only try to track sections when we’re on the portfolio page
    if (!location.pathname.startsWith("/admin")) {
      handleActiveSection();
      window.addEventListener("scroll", handleActiveSection, { passive: true });
      window.addEventListener("resize", handleActiveSection);

      return () => {
        window.removeEventListener("scroll", handleActiveSection);
        window.removeEventListener("resize", handleActiveSection);
      };
    }
  }, [location.pathname]);

  /* -------------------- Theme Toggle -------------------- */
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const closeMenu = () => setMenuOpen(false);

  /* -------------------- Navbar Items -------------------- */
  const navItems = [
    { id: "home", href: "#hero", label: "Home" },
    { id: "about", href: "#about", label: "About" },
    { id: "projects", href: "#projects", label: "Projects" },
    { id: "skills", href: "#skills", label: "Skills" },
    { id: "education", href: "#education", label: "Education" },
    { id: "services", href: "#services", label: "Services" },
    { id: "contact", href: "#contact", label: "Contact" },
  ];

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <nav className="navbar">

          {/* Logo */}
          <div className="logo">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                goToSection("#hero");
              }}
            >
              Krisha Patel
            </a>
          </div>

          {/* NAV LINKS (left menu) */}
          <ul className={`nav-links ${menuOpen ? "active" : ""}`} id="navLinks">
            {navItems.map(({ id, href, label }) => (
              <li key={id}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className={`nav-link ${activeSection === id ? "active" : ""}`}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection(href);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* RIGHT-SIDE Buttons */}
          <div className="nav-actions">
            {/* If NOT logged in → show Signin + Signup */}
            {!user && (
              <>
                <Link to="/signin" className="auth-btn">Sign In</Link>
                <Link to="/signup" className="auth-btn">Sign Up</Link>
              </>
            )}

            {/* If ADMIN → show Admin button */}
            {user?.role === "admin" && (
              <Link to="/admin/projects" className="auth-btn admin-btn">
                Admin
              </Link>
            )}

            {/* If LOGGED IN → show Logout */}
            {user && (
              <button
                className="auth-btn logout-btn"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            )}

            {/* Theme Toggle */}
            <button
              type="button"
              className="theme-toggle"
              aria-label="Toggle color theme"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="theme-dot" />
              {theme === "dark" ? "Light" : "Dark"}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className={`hamburger ${menuOpen ? "active" : ""}`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="navLinks"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

        </nav>
      </div>
    </header>
  );
}
