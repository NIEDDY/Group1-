import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Set header height CSS variable
  useEffect(() => {
    const updateHeaderHeight = () => {
      const height = headerRef.current?.offsetHeight;
      if (height) {
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "features", "services", "contact"];
      const scrollY = window.scrollY;
      let current = "home";

      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 80; // smaller header offset
          if (scrollY >= top) current = id;
        }
      }

      setActiveSection(current);
      setIsScrolled(scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Wait for navigation
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home", section: true },
    { id: "about", label: "About", section: true },
    { id: "features", label: "Features", section: true },
    { id: "services", label: "Services", section: true },
    { id: "contact", label: "Contact", section: true },
    { id: "marketplace", label: "Marketplace", href: "/marketplace" },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-background/70 backdrop-blur"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={() => scrollToSection("home")}
          >
            <img
              src={logo}
              alt="Smart Cooperative Hub Logo"
              className="h-24 w-24 md:h-28 md:w-28 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ id, label, href, section }: any) => (
              href ? (
                <Link
                  key={id}
                  to={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base md:text-lg font-medium transition-colors text-foreground hover:text-blue-700`}
                >
                  {label}
                </Link>
              ) : (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-base md:text-lg font-medium transition-colors ${
                    activeSection === id
                      ? "text-blue-700 font-semibold"
                      : "text-foreground hover:text-blue-700"
                  }`}
                >
                  {label}
                </button>
              )
            ))}
            <Button className="ml-3 py-1.5 px-4 text-sm md:text-base bg-blue-700 hover:bg-blue-800 text-white">Get Started</Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden py-4 space-y-4 border-t"
              aria-label="Mobile navigation"
            >
              {navLinks.map(({ id, label, href, section }: any) => (
                href ? (
                  <Link
                    key={id}
                    to={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left text-base md:text-lg transition-colors text-foreground hover:text-blue-700`}
                  >
                    {label}
                  </Link>
                ) : (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`block w-full text-left text-base md:text-lg transition-colors ${
                      activeSection === id
                        ? "text-blue-700 font-semibold"
                        : "text-foreground hover:text-blue-700"
                    }`}
                  >
                    {label}
                  </button>
                )
              ))}
              <Button className="w-full py-2 md:py-2.5 text-sm md:text-base bg-blue-700 hover:bg-blue-800 text-white">Get Started</Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
