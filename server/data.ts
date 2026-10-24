import { Service, AppContent, ContactMessage, NewsletterSubscription } from "./types.ts";

export const services: Service[] = [
  {
    id: "network",
    title: {
      en: "Network & Infrastructure",
      fr: "Réseau & Infrastructure",
    },
    desc: {
      en: "Professional installation and cabling for businesses and individuals. High-performance RJ45 structured cabling.",
      fr: "Installation et câblage professionnels pour entreprises et particuliers. Câblage structuré RJ45 haute performance.",
    },
    features: {
      en: ["RJ45 Cabling", "Network Audit", "Infrastructure Design", "48h Quote"],
      fr: ["Câblage RJ45", "Audit Réseau", "Conception d'Infrastructure", "Devis sous 48h"],
    },
  },
  {
    id: "data",
    title: {
      en: "Data Science & BI",
      fr: "Science des Données & BI",
    },
    desc: {
      en: "Transform raw data into actionable insights. Predictive modeling and automated reporting with Metabase & PowerBI.",
      fr: "Transformez les données brutes en informations exploitables. Modélisation prédictive et rapports automatisés avec Metabase & PowerBI.",
    },
    features: {
      en: ["Data Modeling", "Predictive Analytics", "KPI Dashboards", "Strategic Reporting"],
      fr: ["Modélisation de Données", "Analyses Prédictives", "Tableaux de Bord KPI", "Rapports Stratégiques"],
    },
  },
  {
    id: "web",
    title: {
      en: "Web Design & Dev",
      fr: "Design & Dév Web",
    },
    desc: {
      en: "Modern, responsive web applications built for performance. We focus on UX/UI that converts visitors into customers.",
      fr: "Applications web modernes et réactives conçues pour la performance. Nous nous concentrons sur une UX/UI qui convertit.",
    },
    features: {
      en: ["Custom UI/UX", "Responsive Design", "SEO Optimization", "Ongoing Support"],
      fr: ["UI/UX Personnalisée", "Design Réactif", "Optimisation SEO", "Support Continu"],
    },
  },
];

export const appContent: AppContent = {
  hero: {
    en: {
      badge: "Innovation & Excellence",
      title: "Building the digital future of your business",
      desc: "We combine technical expertise in network infrastructure, data science, and web development to create high-performance solutions.",
      cta1: "Our Services",
      cta2: "Contact Us",
      imageUrl: "/media/hero.jpg"
    },
    fr: {
      badge: "Innovation & Excellence",
      title: "Construire le futur numérique de votre entreprise",
      desc: "Nous combinons expertise technique en infrastructure réseau, science des données et développement web pour créer des solutions performantes.",
      cta1: "Nos Services",
      cta2: "Contactez-nous",
      imageUrl: "/media/hero.jpg"
    }
  },
  about: {
    en: {
      badge: "About Us",
      title: "A Decade of Digital Transformation",
      desc: "Founded on the principle of technical excellence, we help companies navigate the complex landscape of modern technology with confidence and clarity.",
      exp: "Years Experience",
      cultureTitle: "Data-Driven Culture",
      cultureDesc: "We believe in making decisions based on solid data and rigorous analysis.",
      qualityTitle: "Quality Assurance",
      qualityDesc: "Every project undergoes strict quality control to ensure maximum performance.",
      imageUrl: "/media/about.jpg"
    },
    fr: {
      badge: "À Propos",
      title: "Une décennie de transformation numérique",
      desc: "Fondée sur le principe de l'excellence technique, nous aidons les entreprises à naviguer dans le paysage complexe de la technologie moderne avec confiance et clarté.",
      exp: "Années d'Expérience",
      cultureTitle: "Culture axée sur les données",
      cultureDesc: "Nous croyons en la prise de décisions basées sur des données solides et une analyse rigoureuse.",
      qualityTitle: "Assurance Qualité",
      qualityDesc: "Chaque projet subit un contrôle qualité strict pour garantir des performances maximales.",
      imageUrl: "/media/about.jpg"
    }
  }
};

export const contactMessages: ContactMessage[] = [];
export const newsletterSubscriptions: NewsletterSubscription[] = [];
