import { motion } from "motion/react";
import { Network, Database, Globe, CheckCircle2, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Service } from "../types";

interface ServiceCardProps {
  key?: React.Key;
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
    className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-sm hover:shadow-xl transition-all"
  >
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-white mb-8`}>
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tight text-white">{title}</h3>
    <p className="text-white/60 mb-8 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/80">
          <CheckCircle2 className="w-4 h-4 text-brand-accent" /> {f}
        </li>
      ))}
    </ul>
    <button className="mt-10 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-accent hover:gap-4 transition-all">
      {learnMoreText} <ChevronRight className="w-4 h-4" />
    </button>
  </motion.div>
);

export const Services = ({ t, lang }: { t: any; lang: 'en' | 'fr' }) => {
  const [apiServices, setApiServices] = useState<Service[]>([]);
  const icons = [Network, Database, Globe];
  const colors = ["bg-brand-accent", "bg-brand-secondary", "bg-brand-accent/80"];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          setApiServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  // Use API services if available, otherwise fallback to translations
  const displayServices = apiServices.length > 0 
    ? apiServices.map(s => ({
        title: s.title[lang],
        desc: s.desc[lang],
        features: s.features[lang]
      }))
    : t.serviceItems;

  return (
    <section id="services" className="section-padding bg-brand-dark text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-accent font-bold uppercase tracking-[0.2em] text-xs mb-4 block">{t.services.badge}</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none">
              {t.services.title.split(' ').slice(0, -2).join(' ')} <br />
              {t.services.title.split(' ').slice(-2).join(' ')}
            </h2>
          </div>
          <p className="max-w-md text-white/60 text-lg">
            {t.services.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayServices.map((s: any, i: number) => (
            <ServiceCard 
              key={i} 
              icon={icons[i % icons.length]}
              title={s.title}
              description={s.desc}
              features={s.features}
              color={colors[i % colors.length]}
              learnMoreText={t.services.learnMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
