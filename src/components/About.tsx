import { BarChart3, CheckCircle2 } from "lucide-react";

export const About = ({ t }: { t: any }) => {
  return (
    <section id="about" className="section-padding bg-brand-paper">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/digital-infrastructure-modern/1200/1500" 
                alt="Modern IT Infrastructure" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-brand-primary text-white p-10 rounded-3xl shadow-xl hidden md:block">
              <span className="text-5xl font-display font-bold block mb-2">10+</span>
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
