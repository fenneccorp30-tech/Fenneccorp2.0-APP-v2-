import { motion } from "motion/react";
import { Network, Database, Globe, CheckCircle2, ChevronRight } from "lucide-react";

interface ServiceCardProps {
  key?: number | string;
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

export const Services = ({ t }: { t: any }) => {
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
