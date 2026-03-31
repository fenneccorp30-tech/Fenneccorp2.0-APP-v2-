import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  lang: "en" | "fr";
  setLang: (lang: "en" | "fr") => void;
  t: any;
}

export const Navbar = ({ lang, setLang, t }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.8)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <motion.nav
      style={{ backgroundColor, backdropBlur }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4 border-b border-white/5" : "py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-display font-bold text-xl group-hover:rotate-12 transition-transform">
            F
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter text-white">
            FENNECCORP<span className="text-brand-primary">3.0</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-brand-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-8 border-l border-white/10">
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang === "en" ? "FR" : "EN"}
            </button>
            <a
              href="#contact"
              className="bg-white text-brand-dark px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-brand-dark border-b border-white/5 p-6 md:hidden"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-display font-bold text-white hover:text-brand-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setLang(lang === "en" ? "fr" : "en");
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50"
              >
                <Globe className="w-4 h-4" />
                {lang === "en" ? "Français" : "English"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
