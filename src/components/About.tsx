import { BarChart3, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AboutContent } from "../types";

export const About = ({ t, lang }: { t: any; lang: "en" | "fr" }) => {
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    fetch("/api/content/about")
      .then((res) => res.json())
      .then((data) => {
        if (data && data[lang]) {
          setContent(data[lang]);
        }
      })
      .catch((err) => console.error("Error fetching about content:", err));
  }, [lang]);

  const aboutData = (content && content.title) ? content : {
    badge: t.about.badge,
    title: t.about.title,
    desc: t.about.desc,
    exp: t.about.exp,
    cultureTitle: t.about.cultureTitle,
    cultureDesc: t.about.cultureDesc,
    qualityTitle: t.about.qualityTitle,
    qualityDesc: t.about.qualityDesc,
    imageUrl: "/media/about.jpg"
  };

  const title = aboutData.title || "";

  return (
    <section id="about" className="section-padding bg-brand-dark text-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
              <img 
                src={aboutData.imageUrl} 
                alt="Network Infrastructure" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-brand-accent text-white p-10 rounded-3xl shadow-xl hidden md:block">
              <span className="text-5xl font-display font-bold block mb-2">10+</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80">{aboutData.exp}</span>
            </div>
          </div>

          <div>
            <span className="text-brand-accent font-bold uppercase tracking-[0.2em] text-xs mb-4 block">{aboutData.badge}</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-8 leading-tight">
              {title.includes(',') ? (
                <>
                  {title.split(',')[0]}, <br />
                  <span className="gradient-text">{title.split(',')[1]}</span>
                </>
              ) : (
                title
              )}
            </h2>
            <p className="text-xl text-white/60 mb-8 leading-relaxed font-light">
              {aboutData.desc}
            </p>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-sm shrink-0">
                  <BarChart3 className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">{aboutData.cultureTitle}</h4>
                  <p className="text-white/50">{aboutData.cultureDesc}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-sm shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">{aboutData.qualityTitle}</h4>
                  <p className="text-white/50">{aboutData.qualityDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
