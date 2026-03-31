import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { HeroContent } from "../types";

export const Hero = ({ t, lang }: { t: any; lang: "en" | "fr" }) => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    fetch("/api/content/hero")
      .then((res) => res.json())
      .then((data) => setContent(data[lang]))
      .catch((err) => console.error("Error fetching hero content:", err));
  }, [lang]);

  const heroData = content || {
    badge: t.hero.badge,
    title: t.hero.title,
    desc: t.hero.desc,
    cta1: t.hero.cta1,
    cta2: t.hero.cta2,
    imageUrl: "/media/hero.jpg"
  };

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative h-screen flex items-center overflow-hidden bg-brand-dark text-white"
      style={{ position: 'relative' }}
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img 
          src={heroData.imageUrl} 
          alt="Modern Workspace" 
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
              {heroData.badge}
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8 text-balance">
              {heroData.title.split(' ').slice(0, -2).join(' ')} <br />
              <span className="gradient-text">{heroData.title.split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mb-12 leading-relaxed">
              {heroData.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="bg-brand-primary text-white px-10 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform group">
                {heroData.cta1} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-center">
                {heroData.cta2}
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
