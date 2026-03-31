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

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
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
