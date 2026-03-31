import { useState } from "react";
import { translations } from "./translations";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Admin } from "./components/Admin";

export default function App() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [showAdmin, setShowAdmin] = useState(false);
  const t = translations[lang];

  if (showAdmin) {
    return <Admin onBack={() => setShowAdmin(false)} />;
  }

  return (
    <main className="font-sans selection:bg-brand-primary selection:text-white">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <Services t={t} lang={lang} />
      <About t={t} lang={lang} />
      <Contact t={t} />
      <Footer t={t} />
      
      {/* Hidden Admin Link for Dev/Testing */}
      <div className="fixed bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setShowAdmin(true)}
          className="text-[8px] text-white/20 hover:text-brand-primary transition-colors"
        >
          Admin
        </button>
      </div>
    </main>
  );
}
