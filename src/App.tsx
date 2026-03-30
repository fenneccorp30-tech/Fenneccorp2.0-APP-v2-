/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  Network, 
  Database, 
  Globe, 
  ArrowRight, 
  Mail, 
  Phone, 
  CheckCircle2, 
  BarChart3, 
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const translations = {
  en: {
    nav: { home: "Home", services: "Services", about: "About", contact: "Contact", getStarted: "Get Started" },
    hero: { badge: "Next-Gen IT Solutions", title: "UPGRADE YOUR DIGITAL WORLD", desc: "Expert consulting in Network Infrastructure, Data Science, and Modern Web Development. We turn raw data into strategic intelligence.", cta1: "Explore Services", cta2: "Contact Us" },
    services: { badge: "Our Expertise", title: "SOLUTIONS THAT DRIVE RESULTS", desc: "We provide a comprehensive suite of IT services designed to scale with your business needs.", learnMore: "Learn More" },
    serviceItems: [
      { title: "Network & Infrastructure", desc: "Professional installation and cabling for businesses and individuals. High-performance RJ45 structured cabling.", features: ["RJ45 Cabling", "Network Audit", "Infrastructure Design", "48h Quote"] },
      { title: "Data Science & BI", desc: "Transform raw data into actionable insights. Predictive modeling and automated reporting with Metabase & PowerBI.", features: ["Data Modeling", "Predictive Analytics", "KPI Dashboards", "Strategic Reporting"] },
      { title: "Web Design & Dev", desc: "Modern, responsive web applications built for performance. We focus on UX/UI that converts visitors into customers.", features: ["Custom UI/UX", "Responsive Design", "SEO Optimization", "Ongoing Support"] }
    ],
    about: { badge: "About Us", title: "COMPLEMENTARY SKILLS, ONE SHARED VISION.", desc: "We are a diverse team of passionate professionals, each bringing specialized and complementary skills to meet your digital needs.", exp: "Years of Experience", cultureTitle: "Data-Driven Culture", cultureDesc: "We believe in making decisions based on evidence and patterns, not just intuition.", qualityTitle: "Quality First", qualityDesc: "Every line of code and every network cable is installed with precision and care." },
    contact: { title: "LET'S BUILD THE FUTURE.", desc: "Have a project in mind? We'd love to hear from you. Our team is ready to help you sort out your queries.", call: "Call Us", email: "Email Us", nameLabel: "Full Name", emailLabel: "Email Address", messageLabel: "Message", send: "Send Message" },
    footer: { rights: "All rights reserved. Powered by React." }
  },
  fr: {
    nav: { home: "Accueil", services: "Services", about: "À Propos", contact: "Contact", getStarted: "Commencer" },
    hero: { badge: "Solutions IT de Nouvelle Génération", title: "AMÉLIOREZ VOTRE MONDE NUMÉRIQUE", desc: "Conseil expert en infrastructure réseau, science des données et développement web moderne. Nous transformons les données brutes en informations exploitables.", cta1: "Explorer les Services", cta2: "Contactez-nous" },
    services: { badge: "Notre Expertise", title: "DES SOLUTIONS QUI GÉNÈRENT DES RÉSULTATS", desc: "Nous proposons une suite complète de services informatiques conçus pour évoluer avec vos besoins.", learnMore: "En savoir plus" },
    serviceItems: [
      { title: "Réseau & Infrastructure", desc: "Installation et câblage professionnels pour entreprises et particuliers. Câblage structuré RJ45 haute performance.", features: ["Câblage RJ45", "Audit Réseau", "Conception d'Infrastructure", "Devis sous 48h"] },
      { title: "Science des Données & BI", desc: "Transformez les données brutes en informations exploitables. Modélisation prédictive et rapports automatisés avec Metabase & PowerBI.", features: ["Modélisation de Données", "Analyses Prédictives", "Tableaux de Bord KPI", "Rapports Stratégiques"] },
      { title: "Design & Dév Web", desc: "Applications web modernes et réactives conçues pour la performance. Nous nous concentrons sur une UX/UI qui convertit.", features: ["UI/UX Personnalisée", "Design Réactif", "Optimisation SEO", "Support Continu"] }
    ],
    about: { badge: "À Propos de Nous", title: "COMPÉTENCES COMPLÉMENTAIRES, UNE VISION COMMUNE.", desc: "Nous sommes une équipe diversifiée de professionnels passionnés, apportant chacun des compétences spécialisées pour répondre à vos besoins numériques.", exp: "Années d'Expérience", cultureTitle: "Culture Axée sur les Données", cultureDesc: "Nous croyons en la prise de décisions basées sur des preuves et des modèles, pas seulement sur l'intuition.", qualityTitle: "La Qualité d'Abord", qualityDesc: "Chaque ligne de code et chaque câble réseau est installé avec précision et soin." },
    contact: { title: "CONSTRUISONS L'AVENIR.", desc: "Vous avez un projet en tête ? Nous aimerions avoir de vos nouvelles. Notre équipe est prête à répondre à vos questions.", call: "Appelez-nous", email: "Écrivez-nous", nameLabel: "Nom Complet", emailLabel: "Adresse Email", messageLabel: "Message", send: "Envoyer le Message" },
    footer: { rights: "Tous droits réservés. Propulsé par React." }
  }
};

const Navbar = ({ lang, setLang, t }: { lang: 'en' | 'fr', setLang: (l: 'en' | 'fr') => void, t: any }) => {
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

const Hero = ({ t }: { t: any }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" ref={containerRef} className="relative h-screen flex items-center overflow-hidden bg-brand-dark text-white">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img 
          src="https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc" 
          alt="Data Center with Code Overlay" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
              {t.hero.badge}
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8 text-balance">
              {t.hero.title.split(' ').slice(0, -2).join(' ')} <br />
              <span className="gradient-text">{t.hero.title.split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mb-12 leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="bg-brand-primary text-white px-10 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform group">
                {t.hero.cta1} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-center">
                {t.hero.cta2}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-px h-12 bg-white" />
      </div>
    </section>
  );
};

interface ServiceCardProps {
  key?: number;
  icon: any;
  title: string;
  description: string;
  features: string[];
  color: string;
  learnMoreText: string;
}

const ServiceCard = ({ icon: Icon, title, description, features, color, learnMoreText }: ServiceCardProps) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition-all"
  >
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-white mb-8`}>
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tight">{title}</h3>
    <p className="text-gray-500 mb-8 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
          <CheckCircle2 className="w-4 h-4 text-brand-primary" /> {f}
        </li>
      ))}
    </ul>
    <button className="mt-10 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
      {learnMoreText} <ChevronRight className="w-4 h-4" />
    </button>
  </motion.div>
);

const Services = ({ t }: { t: any }) => {
  const icons = [Network, Database, Globe];
  const colors = ["bg-blue-600", "bg-indigo-600", "bg-sky-500"];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-primary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">{t.services.badge}</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none">
              {t.services.title.split(' ').slice(0, -2).join(' ')} <br />
              {t.services.title.split(' ').slice(-2).join(' ')}
            </h2>
          </div>
          <p className="max-w-md text-gray-500 text-lg">
            {t.services.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.serviceItems.map((s: any, i: number) => (
            <ServiceCard 
              key={i} 
              icon={icons[i]}
              title={s.title}
              description={s.desc}
              features={s.features}
              color={colors[i]}
              learnMoreText={t.services.learnMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const About = ({ t }: { t: any }) => {
  return (
    <section id="about" className="section-padding bg-brand-paper">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/server-cables-macro/1200/1500" 
                alt="Network Infrastructure Close-up" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-brand-primary text-white p-10 rounded-3xl shadow-xl hidden md:block">
              <span className="text-5xl font-display font-bold block mb-2">3+</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80">{t.about.exp}</span>
            </div>
          </div>

          <div>
            <span className="text-brand-primary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">{t.about.badge}</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-8 leading-tight">
              {t.about.title.split(',')[0]}, <br />
              {t.about.title.split(',')[1]}
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
              {t.about.desc}
            </p>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <BarChart3 className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t.about.cultureTitle}</h4>
                  <p className="text-gray-500">{t.about.cultureDesc}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t.about.qualityTitle}</h4>
                  <p className="text-gray-500">{t.about.qualityDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ t }: { t: any }) => {
  return (
    <section id="contact" className="section-padding bg-brand-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 -skew-x-12 translate-x-1/2" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8">
              {t.contact.title.split(' ').slice(0, -1).join(' ')} <br />
              {t.contact.title.split(' ').slice(-1).join(' ')}
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-md font-light">
              {t.contact.desc}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <span className="block text-sm text-white/40 uppercase tracking-widest font-bold mb-1">{t.contact.call}</span>
                  <a href="tel:+213551759931" className="text-2xl font-display font-medium hover:text-brand-primary transition-colors">+213 551 759 931</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <span className="block text-sm text-white/40 uppercase tracking-widest font-bold mb-1">{t.contact.email}</span>
                  <a href="mailto:fenneccorp3.0@gmail.com" className="text-2xl font-display font-medium hover:text-brand-primary transition-colors">fenneccorp3.0@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[40px] text-brand-dark"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.contact.nameLabel}</label>
                  <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.contact.emailLabel}</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.contact.messageLabel}</label>
                <textarea rows={4} placeholder="..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary transition-all resize-none" />
              </div>
              <button className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-brand-primary transition-all shadow-lg hover:shadow-brand-primary/20">
                {t.contact.send}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ t }: { t: any }) => {
  return (
    <footer className="bg-brand-dark text-white/40 py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-display font-bold">F</div>
          <span className="font-display font-bold text-lg tracking-tight text-white">FENNECCORP<span className="text-brand-primary">3.0</span></span>
        </div>
        
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Fenneccorp 3.0. {t.footer.rights}
        </p>

        <div className="flex gap-6">
          {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
            <a key={social} href="#" className="text-sm hover:text-white transition-colors">{social}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const t = translations[lang];

  return (
    <main className="font-sans selection:bg-brand-primary selection:text-white">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Services t={t} />
      <About t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </main>
  );
}
