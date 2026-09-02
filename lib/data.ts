export type Service = {
  id: string;
  title: string;
  short: string;
  icon: string;
  tint: string;
  category: 'Build' | 'Growth' | 'IA';
  description: string;
  deliverables: string[];
  stack: string[];
  priceFrom: number;
  duration: string;
  kpis: { label: string; value: string }[];
};

export const SERVICES: Service[] = [
  {
    id: 'web',
    title: 'Développement web sur mesure',
    short: 'Sites vitrines, corporate & portails clients',
    icon: 'code-slash',
    tint: '#5B7CFF',
    category: 'Build',
    description:
      "Des sites pensés pour la performance et la conversion. Pas de template : une architecture sur mesure, un design system dédié et un score Lighthouse qui dépasse 95 sur chaque page livrée.",
    deliverables: [
      'Audit et architecture de l’information',
      'Design system + maquettes haute fidélité',
      'Intégration responsive pixel-perfect',
      'CMS headless pour l’autonomie éditoriale',
      'Optimisation Core Web Vitals',
      'Formation équipe + documentation',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Sanity', 'Vercel'],
    priceFrom: 28000,
    duration: '6 à 9 semaines',
    kpis: [
      { label: 'Score perf. moyen', value: '97/100' },
      { label: 'Sites livrés', value: '120+' },
      { label: 'Conversion', value: '×3,2' },
    ],
  },
  {
    id: 'mobile',
    title: 'Applications iOS & Android',
    short: 'Apps natives et cross-platform prêtes pour les stores',
    icon: 'phone-portrait',
    tint: '#22D3EE',
    category: 'Build',
    description:
      "Du prototype à la publication sur l’App Store et Google Play. Une base de code unique, des animations natives et une expérience qui donne envie de revenir chaque jour.",
    deliverables: [
      'Atelier de cadrage produit',
      'Prototype interactif validé par vos utilisateurs',
      'Développement React Native / Expo',
      'Notifications push & analytics',
      'Publication App Store + Play Store',
      'Suivi des versions et hotfix',
    ],
    stack: ['React Native', 'Expo', 'Supabase', 'Firebase', 'RevenueCat'],
    priceFrom: 65000,
    duration: '10 à 14 semaines',
    kpis: [
      { label: 'Apps publiées', value: '24' },
      { label: 'Note stores', value: '4,7★' },
      { label: 'Crash-free', value: '99,6%' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & portails clients',
    short: 'Catalogues, paiement, espace client, ERP connecté',
    icon: 'cart',
    tint: '#A78BFA',
    category: 'Build',
    description:
      "Boutiques rapides, tunnels d’achat courts, connexion à votre ERP ou votre stock temps réel. Chaque friction retirée est un panier gagné.",
    deliverables: [
      'Tunnel d’achat optimisé (3 étapes max)',
      'Paiement CMI, Stripe, PayPal',
      'Synchronisation catalogue & stock',
      'Espace client et suivi de commande',
      'Tableaux de bord ventes',
      'Tests A/B sur les pages clés',
    ],
    stack: ['Shopify Hydrogen', 'Next.js Commerce', 'Medusa', 'Stripe', 'CMI'],
    priceFrom: 45000,
    duration: '8 à 12 semaines',
    kpis: [
      { label: 'Panier moyen', value: '+38%' },
      { label: 'Abandon panier', value: '-27%' },
      { label: 'Temps de chargement', value: '1,1s' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & visibilité organique',
    short: 'Technique, contenu et netlinking mesurés au trafic',
    icon: 'trending-up',
    tint: '#34D399',
    category: 'Growth',
    description:
      "Un SEO qui se lit dans vos chiffres : audit technique, sémantique par intention de recherche, contenus rédigés par des humains et suivi mensuel transparent.",
    deliverables: [
      'Audit technique complet (300 points)',
      'Recherche de mots-clés par intention',
      'Optimisation on-page et maillage',
      'Contenus éditoriaux FR / EN / AR',
      'Netlinking qualitatif',
      'Reporting mensuel + call stratégie',
    ],
    stack: ['Ahrefs', 'Search Console', 'Screaming Frog', 'GA4', 'Looker'],
    priceFrom: 8000,
    duration: 'Accompagnement mensuel',
    kpis: [
      { label: 'Trafic organique', value: '+164%' },
      { label: 'Mots-clés top 3', value: '×4' },
      { label: 'Délai 1ers résultats', value: '8 sem.' },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing digital & acquisition',
    short: 'Meta, Google Ads, social media et branding',
    icon: 'megaphone',
    tint: '#FF7A59',
    category: 'Growth',
    description:
      "Des campagnes pilotées au coût par acquisition, pas au nombre de likes. Créas, audiences, landing pages et tracking : tout est aligné sur une seule métrique, vos ventes.",
    deliverables: [
      'Stratégie d’acquisition 90 jours',
      'Créations publicitaires (statique + vidéo)',
      'Campagnes Meta / Google / TikTok',
      'Landing pages dédiées & A/B tests',
      'Tracking serveur & attribution',
      'Dashboard temps réel',
    ],
    stack: ['Meta Ads', 'Google Ads', 'GA4', 'Looker Studio', 'Brevo'],
    priceFrom: 12000,
    duration: 'Sprints de 90 jours',
    kpis: [
      { label: 'ROAS moyen', value: '4,6' },
      { label: 'CPL', value: '-41%' },
      { label: 'Budgets pilotés', value: '18M MAD' },
    ],
  },
  {
    id: 'ia',
    title: 'Solutions IA & automatisation',
    short: 'Chatbots, agents WhatsApp, workflows n8n',
    icon: 'sparkles',
    tint: '#F472B6',
    category: 'IA',
    description:
      "Nous branchons l’IA là où elle vous fait gagner des heures : réponses clients 24/7 sur WhatsApp, qualification de leads, devis automatiques, synchronisation entre vos outils.",
    deliverables: [
      'Cartographie des tâches automatisables',
      'Agent WhatsApp Business connecté au CRM',
      'Chatbot site entraîné sur vos contenus',
      'Workflows n8n / Make sur mesure',
      'Garde-fous et supervision humaine',
      'Suivi des économies générées',
    ],
    stack: ['OpenAI', 'n8n', 'WhatsApp Cloud API', 'LangChain', 'Pinecone'],
    priceFrom: 18000,
    duration: '3 à 6 semaines',
    kpis: [
      { label: 'Réponses automatisées', value: '78%' },
      { label: 'Temps gagné / mois', value: '96 h' },
      { label: 'Leads qualifiés', value: '×2,1' },
    ],
  },
];

export type Project = {
  id: string;
  client: string;
  sector: string;
  category: 'Web' | 'Mobile' | 'E-commerce' | 'IA';
  year: string;
  city: string;
  cover: string;
  tagline: string;
  challenge: string;
  solution: string[];
  results: { label: string; value: string }[];
  stack: string[];
  duration: string;
  accent: string;
};

const img = (seed: string) => `https://picsum.photos/seed/${seed}/1200/900`;

export const PROJECTS: Project[] = [
  {
    id: 'mr-bricolage',
    client: 'Mr.Bricolage',
    sector: 'Retail & bricolage',
    category: 'E-commerce',
    year: '2024',
    city: 'Casablanca',
    cover: img('hw-bricolage-store'),
    tagline: 'Un catalogue de 14 000 références rendu enfin navigable.',
    challenge:
      "L’ancien site mettait plus de 6 secondes à charger une fiche produit et le stock magasin n’était pas visible en ligne. Résultat : des paniers abandonnés et des appels en magasin à répétition.",
    solution: [
      'Refonte complète du catalogue avec recherche instantanée',
      'Disponibilité stock temps réel par magasin',
      'Tunnel click & collect en 3 étapes',
      'Espace pro avec tarifs négociés',
      'Migration SEO sans perte de positions',
    ],
    results: [
      { label: 'Conversion', value: '×2,4' },
      { label: 'Temps de chargement', value: '1,2 s' },
      { label: 'Score Lighthouse', value: '98' },
      { label: 'Commandes click & collect', value: '+310%' },
    ],
    stack: ['Next.js', 'Medusa', 'Algolia', 'CMI', 'Vercel'],
    duration: '11 semaines',
    accent: '#FF7A59',
  },
  {
    id: 'jardin-secret',
    client: 'Le Jardin Secret Marrakech',
    sector: 'Tourisme & culture',
    category: 'Web',
    year: '2024',
    city: 'Marrakech',
    cover: img('hw-jardin-secret'),
    tagline: 'Billetterie en ligne et visite immersive en 4 langues.',
    challenge:
      "Le monument vendait 100% de ses billets sur place, avec des files d’attente aux heures de pointe et zéro donnée sur ses visiteurs internationaux.",
    solution: [
      'Site multilingue FR / EN / ES / AR',
      'Billetterie en ligne avec QR code',
      'Galerie immersive et visite guidée audio',
      'Intégration Google Things to do',
      'Dashboard fréquentation en temps réel',
    ],
    results: [
      { label: 'Billets en ligne', value: '41%' },
      { label: 'Trafic organique', value: '+186%' },
      { label: 'Temps sur site', value: '3 min 40' },
      { label: 'Langues actives', value: '4' },
    ],
    stack: ['Next.js', 'Sanity', 'Stripe', 'Cloudinary'],
    duration: '9 semaines',
    accent: '#34D399',
  },
  {
    id: 'shemsy-energy',
    client: 'Shemsy Energy',
    sector: 'Énergie solaire',
    category: 'Web',
    year: '2025',
    city: 'Casablanca',
    cover: img('hw-shemsy-solar'),
    tagline: 'Un simulateur d’économies qui génère 60% des leads.',
    challenge:
      "Les prospects ne comprenaient pas le retour sur investissement d’une installation photovoltaïque et l’équipe commerciale passait des heures à faire des estimations manuelles.",
    solution: [
      'Simulateur d’économies par ville et consommation',
      'Génération automatique du devis PDF',
      'Connexion CRM et relances automatisées',
      'Blog technique optimisé SEO',
      'Campagnes Meta connectées au simulateur',
    ],
    results: [
      { label: 'Leads qualifiés', value: '×3,1' },
      { label: 'Coût par lead', value: '-44%' },
      { label: 'Devis automatisés', value: '820/mois' },
      { label: 'Score perf.', value: '96' },
    ],
    stack: ['Next.js', 'n8n', 'HubSpot', 'Meta Ads'],
    duration: '7 semaines',
    accent: '#FFC55C',
  },
  {
    id: 'sunset-properties',
    client: 'Marrakech Sunset Properties',
    sector: 'Immobilier de prestige',
    category: 'Web',
    year: '2024',
    city: 'Marrakech',
    cover: img('hw-sunset-villa'),
    tagline: 'Portail d’annonces haut de gamme + CRM agents.',
    challenge:
      "Les biens étaient diffusés sur des portails tiers, sans image de marque ni base de données propriétaire. Chaque lead était partagé avec 5 concurrents.",
    solution: [
      'Portail d’annonces avec recherche cartographique',
      'Visites virtuelles 360° intégrées',
      'CRM interne pour les agents',
      'Alertes acheteurs par critères',
      'Version anglaise pour la clientèle internationale',
    ],
    results: [
      { label: 'Leads directs', value: '+240%' },
      { label: 'Biens en ligne', value: '180' },
      { label: 'Délai de mise en ligne', value: '4 min' },
      { label: 'Visites virtuelles', value: '100%' },
    ],
    stack: ['Next.js', 'Supabase', 'Mapbox', 'Matterport'],
    duration: '12 semaines',
    accent: '#A78BFA',
  },
  {
    id: 'atlas-clinic',
    client: 'Atlas Medical Group',
    sector: 'Santé',
    category: 'Mobile',
    year: '2025',
    city: 'Rabat',
    cover: img('hw-atlas-clinic'),
    tagline: 'Application patients : rendez-vous, résultats, téléconsultation.',
    challenge:
      "Le standard téléphonique saturait avec 900 appels par jour, essentiellement pour prendre ou déplacer un rendez-vous.",
    solution: [
      'App iOS & Android en 3 mois',
      'Prise de rendez-vous en 40 secondes',
      'Résultats d’analyses sécurisés',
      'Téléconsultation vidéo intégrée',
      'Rappels push et SMS',
    ],
    results: [
      { label: 'Appels standard', value: '-52%' },
      { label: 'Note App Store', value: '4,8★' },
      { label: 'Patients actifs', value: '26k' },
      { label: 'RDV via l’app', value: '63%' },
    ],
    stack: ['React Native', 'Expo', 'Supabase', 'Twilio'],
    duration: '13 semaines',
    accent: '#22D3EE',
  },
  {
    id: 'souk-ai',
    client: 'Souk Digital',
    sector: 'Distribution B2B',
    category: 'IA',
    year: '2025',
    city: 'Tanger',
    cover: img('hw-souk-ai'),
    tagline: 'Un agent WhatsApp qui prend les commandes 24h/24.',
    challenge:
      "Les revendeurs commandaient par WhatsApp, en langage libre. Trois personnes recopiaient les messages dans l’ERP, avec des erreurs de saisie quotidiennes.",
    solution: [
      'Agent IA connecté à WhatsApp Business',
      'Compréhension du darija et du français',
      'Création automatique des commandes dans l’ERP',
      'Escalade vers un humain si doute',
      'Tableau de bord des conversations',
    ],
    results: [
      { label: 'Commandes automatisées', value: '78%' },
      { label: 'Erreurs de saisie', value: '-91%' },
      { label: 'Temps gagné', value: '96 h/mois' },
      { label: 'Disponibilité', value: '24/7' },
    ],
    stack: ['OpenAI', 'n8n', 'WhatsApp Cloud API', 'Odoo'],
    duration: '5 semaines',
    accent: '#F472B6',
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  date: string;
  text: string;
  project?: string;
  tint: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Hicham Benali',
    role: 'Directeur e-commerce',
    company: 'Mr.Bricolage',
    rating: 5,
    date: 'Mars 2025',
    text: "Refonte livrée dans les délais annoncés, sans une seule mauvaise surprise sur le budget. Hamid Kennou a piloté le projet avec une rigueur rare : points hebdo, démos à chaque sprint, et un vrai suivi après la mise en ligne. Nos ventes en ligne ont plus que doublé.",
    project: 'mr-bricolage',
    tint: '#FF7A59',
  },
  {
    id: 't2',
    name: 'Salma Ait Ouarab',
    role: 'Responsable communication',
    company: 'Le Jardin Secret Marrakech',
    rating: 5,
    date: 'Février 2025',
    text: "Nous cherchions une agence capable de comprendre un lieu patrimonial et pas seulement de coder. Le résultat est élégant, rapide, et la billetterie en ligne fonctionne parfaitement depuis le premier jour.",
    project: 'jardin-secret',
    tint: '#34D399',
  },
  {
    id: 't3',
    name: 'Youssef El Amrani',
    role: 'Fondateur',
    company: 'Shemsy Energy',
    rating: 5,
    date: 'Janvier 2025',
    text: "Zakaria a compris notre métier en deux réunions. Le simulateur d’économies qu’ils ont développé génère aujourd’hui la majorité de nos demandes de devis. Réactivité impeccable, réponses toujours sous 24h.",
    project: 'shemsy-energy',
    tint: '#FFC55C',
  },
  {
    id: 't4',
    name: 'Claire Fontaine',
    role: 'Directrice',
    company: 'Marrakech Sunset Properties',
    rating: 5,
    date: 'Décembre 2024',
    text: "Un portail immobilier vraiment haut de gamme, à la hauteur de nos biens. L’équipe a géré la partie CRM sans que nous ayons à comprendre la technique. Excellent accompagnement post-livraison.",
    project: 'sunset-properties',
    tint: '#A78BFA',
  },
  {
    id: 't5',
    name: 'Dr. Nabil Sqalli',
    role: 'Directeur général',
    company: 'Atlas Medical Group',
    rating: 5,
    date: 'Avril 2025',
    text: "Une application médicale, c’est de la confidentialité et de la fiabilité avant tout. HelloWorld a tenu les deux. Nos patients l’ont adoptée en quelques semaines et notre standard respire enfin.",
    project: 'atlas-clinic',
    tint: '#22D3EE',
  },
  {
    id: 't6',
    name: 'Karim Bouzidi',
    role: 'Directeur des opérations',
    company: 'Souk Digital',
    rating: 5,
    date: 'Mai 2025',
    text: "L’agent WhatsApp tourne depuis six mois sans incident. On a récupéré trois personnes sur des tâches à valeur ajoutée. Le retour sur investissement a été atteint en moins de deux mois.",
    project: 'souk-ai',
    tint: '#F472B6',
  },
  {
    id: 't7',
    name: 'Leïla Mansouri',
    role: 'Gérante',
    company: 'Riad Anfa Boutique',
    rating: 5,
    date: 'Novembre 2024',
    text: "Petite structure, gros accompagnement. On ne s’est jamais senties comme un petit client. Hamid Kennou reste joignable même des mois après la livraison, c’est ce qui fait la différence.",
    tint: '#5B7CFF',
  },
  {
    id: 't8',
    name: 'Thomas Girard',
    role: 'Head of Growth',
    company: 'Nomad Rentals — Londres',
    rating: 5,
    date: 'Octobre 2024',
    text: "Working with the Marrakech team from London was seamless. Weekly demos, clear reporting and a product shipped on time. Our booking conversion improved by 2.8x.",
    tint: '#22D3EE',
  },
  {
    id: 't9',
    name: 'Amine Ouhadi',
    role: 'Co-fondateur',
    company: 'Kasbah Logistics',
    rating: 4,
    date: 'Septembre 2024',
    text: "Très bon travail sur le portail transporteurs. Quelques allers-retours sur le design au départ, mais l’équipe a su écouter et corriger vite. Le résultat final est solide.",
    tint: '#34D399',
  },
  {
    id: 't10',
    name: 'Fatima Zahra Idrissi',
    role: 'Responsable marketing',
    company: 'Dar Beida Cosmetics',
    rating: 5,
    date: 'Août 2024',
    text: "Le SEO a décollé au bout du troisième mois, exactement comme annoncé dans la roadmap. Reporting clair, aucun jargon inutile, on comprend ce qu’on paye.",
    tint: '#FFC55C',
  },
  {
    id: 't11',
    name: 'Rachid Ben Salah',
    role: 'Directeur commercial',
    company: 'Gulf Interiors — Dubaï',
    rating: 5,
    date: 'Juillet 2024',
    text: "Zakaria et son équipe ont livré notre configurateur 3D en avance sur le planning. Communication en français et en anglais, décalage horaire jamais un problème.",
    tint: '#A78BFA',
  },
  {
    id: 't12',
    name: 'Meriem Chraibi',
    role: 'Fondatrice',
    company: 'Studio Zellige',
    rating: 5,
    date: 'Juin 2024',
    text: "Un design system magnifique et surtout utilisable par notre équipe interne. On publie nos nouvelles pages nous-mêmes, sans redemander à l’agence à chaque fois.",
    tint: '#FF7A59',
  },
];

export type Phase = {
  id: string;
  index: string;
  weeks: string;
  title: string;
  icon: string;
  summary: string;
  steps: string[];
  output: string;
  tint: string;
};

export const PHASES: Phase[] = [
  {
    id: 'discovery',
    index: '01',
    weeks: 'Semaines 1-2',
    title: 'Discovery & Architecture',
    icon: 'compass',
    summary:
      "On part de vos objectifs business, pas d’un moodboard. Ateliers, analyse concurrentielle, parcours utilisateurs et arborescence validée avant la moindre ligne de code.",
    steps: [
      'Atelier de cadrage (3 h) avec les décideurs',
      'Audit de l’existant et de la concurrence',
      'Personas et parcours utilisateurs',
      'Arborescence et wireframes basse fidélité',
      'Cahier des charges fonctionnel signé',
    ],
    output: 'Spécifications + arborescence validées',
    tint: '#5B7CFF',
  },
  {
    id: 'design',
    index: '02',
    weeks: 'Semaines 3-4',
    title: 'Design System',
    icon: 'color-palette',
    summary:
      "Une identité digitale cohérente : couleurs, typographies, composants réutilisables. Vous validez des maquettes cliquables, pas des images statiques.",
    steps: [
      'Direction artistique et moodboard',
      'Design system complet (Figma)',
      'Maquettes haute fidélité desktop & mobile',
      'Prototype cliquable testé en interne',
      'Deux tours de retours inclus',
    ],
    output: 'Design system + prototype validé',
    tint: '#A78BFA',
  },
  {
    id: 'build',
    index: '03',
    weeks: 'Semaines 5-8',
    title: 'Développement en sprints',
    icon: 'construct',
    summary:
      "Des sprints d’une semaine, une démo à chaque fin de sprint et un environnement de préproduction accessible en permanence. Aucun effet tunnel.",
    steps: [
      'Sprints hebdomadaires avec démo live',
      'Environnement de préprod dès le sprint 1',
      'Intégrations tierces (paiement, CRM, ERP)',
      'Tests automatisés et revue de code',
      'Optimisation performance et accessibilité',
    ],
    output: 'Produit testable en préproduction',
    tint: '#22D3EE',
  },
  {
    id: 'launch',
    index: '04',
    weeks: 'Semaine 9 et +',
    title: 'Launch & Optimisation continue',
    icon: 'rocket',
    summary:
      "La mise en ligne n’est pas la fin du projet. Monitoring, itérations mensuelles et accompagnement de vos équipes pour faire grandir le produit.",
    steps: [
      'Recette finale et checklist de mise en ligne',
      'Migration SEO sans perte de trafic',
      'Monitoring, alertes et sauvegardes',
      'Formation des équipes internes',
      'Itérations mensuelles pilotées par la data',
    ],
    output: 'Mise en ligne + plan d’optimisation',
    tint: '#34D399',
  },
];

export const STATS = [
  { id: 's1', value: 120, suffix: '+', label: 'sites livrés', icon: 'globe-outline' },
  { id: 's2', value: 97, suffix: '%', label: 'score performance', icon: 'speedometer-outline' },
  { id: 's3', value: 3.2, suffix: '×', label: 'conversion moyenne', icon: 'trending-up-outline', decimals: 1 },
  { id: 's4', value: 48, suffix: 'h', label: 'délai de réponse max', icon: 'time-outline' },
];

export const OFFICES = [
  { id: 'ma', city: 'Marrakech', country: 'Maroc — Siège', tz: 'GMT+1', flag: '🇲🇦', address: 'Guéliz, Marrakech 40000' },
  { id: 'uk', city: 'Londres', country: 'Royaume-Uni', tz: 'GMT', flag: '🇬🇧', address: 'Shoreditch, London EC2A' },
  { id: 'ae', city: 'Dubaï', country: 'Émirats arabes unis', tz: 'GMT+4', flag: '🇦🇪', address: 'Business Bay, Dubai' },
];

export const TEAM = [
  { id: 'hamid', name: 'Hamid Kennou', role: 'Directeur de projets', initials: 'HK', tint: '#5B7CFF' },
  { id: 'zakaria', name: 'Zakaria', role: 'Lead développeur', initials: 'ZA', tint: '#22D3EE' },
  { id: 'sara', name: 'Sara Belkadi', role: 'Directrice artistique', initials: 'SB', tint: '#A78BFA' },
  { id: 'omar', name: 'Omar Tazi', role: 'Growth & SEO', initials: 'OT', tint: '#34D399' },
];

export const FAQ = [
  {
    q: 'Combien de temps prend un projet type ?',
    a: "Un site vitrine sur mesure prend 6 à 9 semaines, un e-commerce 8 à 12 semaines et une application mobile 10 à 14 semaines. Le planning est figé après la phase Discovery et nous nous y tenons.",
  },
  {
    q: 'Qui est propriétaire du code ?',
    a: "Vous, à 100%. Le dépôt de code, les accès d’hébergement et les comptes tiers vous sont transférés à la livraison. Aucune dépendance à l’agence n’est imposée.",
  },
  {
    q: 'Travaillez-vous avec des clients hors du Maroc ?',
    a: "Oui. Nous avons des équipes à Marrakech, Londres et Dubaï, et environ 40% de nos projets sont réalisés pour des clients européens ou du Golfe, en français comme en anglais.",
  },
  {
    q: 'Que se passe-t-il après la mise en ligne ?',
    a: "Trois mois de garantie sont inclus sur tout ce que nous livrons, puis un contrat de maintenance optionnel : monitoring, mises à jour, sauvegardes et heures d’évolution mensuelles.",
  },
  {
    q: 'Comment se passe la facturation ?',
    a: "40% à la signature, 30% à la validation du design, 30% à la livraison. Pour les accompagnements SEO et marketing, la facturation est mensuelle, sans engagement au-delà de 3 mois.",
  },
  {
    q: 'Puis-je récupérer un projet commencé par une autre agence ?',
    a: "Oui, après un audit technique de 3 à 5 jours. Nous vous disons honnêtement s’il vaut mieux reprendre l’existant ou repartir d’une base saine, chiffres à l’appui.",
  },
];

export const CONTACT = {
  phone: '+212600000000',
  phoneDisplay: '+212 6 00 00 00 00',
  whatsapp: '212600000000',
  email: 'hello@helloworld.agency',
  site: 'https://helloworld.agency',
};
