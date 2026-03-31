import { useState } from "react";
import { translations } from "./translations";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

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
