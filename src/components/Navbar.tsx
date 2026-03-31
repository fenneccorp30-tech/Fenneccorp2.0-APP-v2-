import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  lang: 'en' | 'fr';
  setLang: (l: 'en' | 'fr') => void;
  t: any;
}

export const Navbar = ({ lang, setLang, t }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass py-4" : "py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-display font-bold text-xl">F</div>
          <span className="font-display font-bold text-xl tracking-tight">FENNECCORP<span className="text-brand-primary">3.0</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-brand-primary transition-colors uppercase tracking-widest">
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-2 bg-black/5 p-1 rounded-full border border-black/5">
            <button 
              onClick={() => setLang('en')} 
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-brand-primary text-white shadow-sm' : 'text-gray-500 hover:text-brand-dark'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('fr')} 
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'fr' ? 'bg-brand-primary text-white shadow-sm' : 'text-gray-500 hover:text-brand-dark'}`}
            >
              FR
            </button>
          </div>

          <a href="#contact" className="bg-brand-dark text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-brand-primary transition-all">
            {t.nav.getStarted}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-1 bg-black/5 p-1 rounded-full border border-black/5">
            <button onClick={() => setLang('en')} className={`px-2 py-1 rounded-full text-[10px] font-bold ${lang === 'en' ? 'bg-brand-primary text-white' : 'text-gray-500'}`}>EN</button>
            <button onClick={() => setLang('fr')} className={`px-2 py-1 rounded-full text-[10px] font-bold ${lang === 'fr' ? 'bg-brand-primary text-white' : 'text-gray-500'}`}>FR</button>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white border-b p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};
