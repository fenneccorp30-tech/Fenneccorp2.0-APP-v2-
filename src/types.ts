export interface Service {
  id: string;
  title: {
    en: string;
    fr: string;
  };
  desc: {
    en: string;
    fr: string;
  };
  features: {
    en: string[];
    fr: string[];
  };
}

export interface HeroContent {
  badge: string;
  title: string;
  desc: string;
  cta1: string;
  cta2: string;
  imageUrl: string;
}

export interface AboutContent {
  badge: string;
  title: string;
  desc: string;
  exp: string;
  cultureTitle: string;
  cultureDesc: string;
  qualityTitle: string;
  qualityDesc: string;
  imageUrl: string;
}

export interface AppContent {
  hero: {
    en: HeroContent;
    fr: HeroContent;
  };
  about: {
    en: AboutContent;
    fr: AboutContent;
  };
}

export interface Translation {
  nav: { home: string; services: string; about: string; contact: string; getStarted: string };
  hero: { badge: string; title: string; desc: string; cta1: string; cta2: string };
  services: { badge: string; title: string; desc: string; learnMore: string };
  serviceItems: { title: string; desc: string; features: string[] }[];
  about: { badge: string; title: string; desc: string; exp: string; cultureTitle: string; cultureDesc: string; qualityTitle: string; qualityDesc: string };
  contact: { title: string; desc: string; call: string; email: string; nameLabel: string; emailLabel: string; messageLabel: string; send: string };
  footer: { rights: string };
}
