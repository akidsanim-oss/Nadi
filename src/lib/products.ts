import type { Lang } from './i18n';

type LStr = Record<Lang, string>;

export interface Collection {
  slug: string;
  name: LStr;
  blurb: LStr;
  image: string;
}

export interface Product {
  id: string;
  name: LStr;
  desc: LStr;
  price: number;
  compareAt?: number;
  image: string;
  collections: string[];
  badge?: 'new' | 'promo' | 'wc';
  player?: string;
  number?: number;
}

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const collections: Collection[] = [
  {
    slug: 'official',
    name: { en: 'Official Jerseys', fr: 'Maillots Officiels', ar: 'القمصان الرسمية' },
    blurb: {
      en: 'Authentic match-grade jerseys, exactly as worn on the pitch.',
      fr: 'Maillots authentiques qualité match, identiques à ceux portés sur le terrain.',
      ar: 'قمصان أصلية بجودة المباريات، تماماً كما تُرتدى في الملعب.',
    },
    image: '/images/jersey-third.png',
  },
  {
    slug: 'home',
    name: { en: 'Home Jerseys', fr: 'Maillots Domicile', ar: 'قمصان الملعب الرئيسي' },
    blurb: {
      en: 'The iconic red of Rabat — home kit 2026.',
      fr: 'Le rouge iconique de Rabat — kit domicile 2026.',
      ar: 'الأحمر الأيقوني — طقم 2026 الأساسي.',
    },
    image: '/images/jersey-home.png',
  },
  {
    slug: 'away',
    name: { en: 'Away Jerseys', fr: 'Maillots Extérieur', ar: 'القمصان الاحتياطية' },
    blurb: {
      en: 'Clean white with zellige detailing — away kit 2026.',
      fr: 'Blanc épuré aux détails zellige — kit extérieur 2026.',
      ar: 'أبيض أنيق بتفاصيل الزليج — الطقم الاحتياطي 2026.',
    },
    image: '/images/jersey-away.png',
  },
  {
    slug: 'players',
    name: { en: 'Shop by Player', fr: 'Acheter par Joueur', ar: 'تسوق حسب اللاعب' },
    blurb: {
      en: 'Díaz, Hakimi, Saibari, El Aynaoui — wear your lion.',
      fr: 'Díaz, Hakimi, Saibari, El Aynaoui — portez votre lion.',
      ar: 'دياز، حكيمي، الصيباري، العيناوي — ارتدِ أسدك.',
    },
    image: '/images/player.png',
  },
  {
    slug: 'supporter',
    name: { en: 'Supporter Jerseys', fr: 'Maillots Supporters', ar: 'قمصان المشجعين' },
    blurb: {
      en: 'Fan-version kits and terrace essentials at friendly prices.',
      fr: 'Versions supporters et essentiels de tribune à prix doux.',
      ar: 'نسخ المشجعين وأساسيات المدرجات بأسعار مناسبة.',
    },
    image: '/images/supporter.png',
  },
  {
    slug: 'training',
    name: { en: 'Training Apparel', fr: 'Vêtements d’Entraînement', ar: 'ملابس التدريب' },
    blurb: {
      en: 'Train like the squad — tops, shorts and tracksuits.',
      fr: 'Entraînez-vous comme les pros — hauts, shorts et survêtements.',
      ar: 'تدرّب مثل المنتخب — قمصان وشورتات وبدلات رياضية.',
    },
    image: '/images/training.png',
  },
  {
    slug: 'lifestyle',
    name: { en: 'Lifestyle Collection', fr: 'Collection Lifestyle', ar: 'مجموعة لايف ستايل' },
    blurb: {
      en: 'Hoodies, tees and streetwear inspired by Moroccan craft.',
      fr: 'Hoodies, t-shirts et streetwear inspirés de l’artisanat marocain.',
      ar: 'هوديز وتيشرتات وأزياء شارع مستوحاة من الحرف المغربية.',
    },
    image: '/images/lifestyle.png',
  },
];

export const products: Product[] = [
  {
    id: 'home-authentic-26',
    name: { en: 'Authentic Home Jersey 2026', fr: 'Maillot Domicile Authentique 2026', ar: 'قميص أساسي أصلي 2026' },
    desc: {
      en: 'The match-grade home jersey of the Atlas Lions, in deep Moroccan red with tonal zellige weave and green trim. Breathable performance fabric, athletic cut.',
      fr: 'Le maillot domicile qualité match des Lions de l’Atlas, rouge profond avec tissage zellige ton sur ton et finitions vertes. Tissu performance respirant, coupe athlétique.',
      ar: 'قميص المباريات الأساسي لأسود الأطلس، باللون الأحمر المغربي العميق مع نسيج زليج وحواف خضراء. قماش رياضي جيد التهوية وقصة احترافية.',
    },
    price: 999,
    image: '/images/jersey-home.png',
    collections: ['official', 'home'],
    badge: 'new',
  },
  {
    id: 'away-authentic-26',
    name: { en: 'Authentic Away Jersey 2026', fr: 'Maillot Extérieur Authentique 2026', ar: 'قميص احتياطي أصلي 2026' },
    desc: {
      en: 'Crisp white away jersey with red and green zellige geometry across the chest. Match-grade fabric with sweat-wicking technology.',
      fr: 'Maillot extérieur blanc éclatant avec géométrie zellige rouge et verte sur la poitrine. Tissu qualité match anti-transpiration.',
      ar: 'قميص احتياطي أبيض ناصع بزخارف زليج حمراء وخضراء على الصدر. قماش بجودة المباريات بتقنية امتصاص العرق.',
    },
    price: 999,
    image: '/images/jersey-away.png',
    collections: ['official', 'away'],
    badge: 'new',
  },
  {
    id: 'third-authentic-26',
    name: { en: 'Third Jersey 2026 — Emerald', fr: 'Troisième Maillot 2026 — Émeraude', ar: 'القميص الثالث 2026 — زمردي' },
    desc: {
      en: 'Limited third kit in deep emerald with gold trim, celebrating the World Cup 2026 campaign. Collector’s edition.',
      fr: 'Troisième kit en édition limitée, vert émeraude et finitions dorées, célébrant la Coupe du Monde 2026. Édition collector.',
      ar: 'الطقم الثالث بإصدار محدود باللون الزمردي وحواف ذهبية احتفالاً بكأس العالم 2026. نسخة للهواة والمقتنين.',
    },
    price: 899,
    compareAt: 1099,
    image: '/images/jersey-third.png',
    collections: ['official'],
    badge: 'wc',
  },
  {
    id: 'home-longsleeve-26',
    name: { en: 'Long-Sleeve Home Jersey 2026', fr: 'Maillot Domicile Manches Longues 2026', ar: 'قميص أساسي بأكمام طويلة 2026' },
    desc: {
      en: 'The classic 2026 home kit in a long-sleeve cut, perfect for cold matchdays in the stands.',
      fr: 'Le kit domicile 2026 en version manches longues, parfait pour les soirs de match frais en tribune.',
      ar: 'الطقم الأساسي 2026 بأكمام طويلة، مثالي لأيام المباريات الباردة في المدرجات.',
    },
    price: 749,
    image: '/images/jersey-home.png',
    collections: ['official', 'home'],
  },
  {
    id: 'hakimi-home',
    name: { en: 'Hakimi #2 — Home Jersey', fr: 'Hakimi n°2 — Maillot Domicile', ar: 'حكيمي 2# — القميص الأساسي' },
    desc: {
      en: 'Official home jersey with HAKIMI 2 heat-pressed printing. The captain of the flank, the pride of Madrid’s Moroccan quarter.',
      fr: 'Maillot domicile officiel avec flocage HAKIMI 2 thermocollé. Le patron du couloir droit.',
      ar: 'القميص الأساسي الرسمي بطباعة حرارية HAKIMI 2. قائد الرواق الأيمن وفخر المغاربة.',
    },
    price: 1099,
    image: '/images/player.png',
    collections: ['players', 'home'],
    badge: 'wc',
    player: 'Achraf Hakimi',
    number: 2,
  },
  {
    id: 'diaz-home',
    name: { en: 'Brahim Díaz #10 — Home Jersey', fr: 'Brahim Díaz n°10 — Maillot Domicile', ar: 'إبراهيم دياز 10# — القميص الأساسي' },
    desc: {
      en: 'Official home jersey with DÍAZ 10 printing. Magic in the half-spaces — the number ten of the new generation.',
      fr: 'Maillot domicile officiel avec flocage DÍAZ 10. La magie dans les demi-espaces — le numéro dix de la nouvelle génération.',
      ar: 'القميص الأساسي الرسمي بطباعة DÍAZ 10. سحر في المساحات — رقم عشرة الجيل الجديد.',
    },
    price: 1099,
    image: '/images/player.png',
    collections: ['players', 'home'],
    badge: 'wc',
    player: 'Brahim Díaz',
    number: 10,
  },
  {
    id: 'saibari-home',
    name: { en: 'Saibari #15 — Home Jersey', fr: 'Saibari n°15 — Maillot Domicile', ar: 'الصيباري 15# — القميص الأساسي' },
    desc: {
      en: 'Official home jersey with SAIBARI 15 printing. Box-to-box energy from the Eindhoven engine.',
      fr: 'Maillot domicile officiel avec flocage SAIBARI 15. L’énergie box-to-box du moteur d’Eindhoven.',
      ar: 'القميص الأساسي الرسمي بطباعة SAIBARI 15. طاقة لا تنضب من محرك أيندهوفن.',
    },
    price: 1099,
    image: '/images/player.png',
    collections: ['players', 'home'],
    badge: 'wc',
    player: 'Ismael Saibari',
    number: 15,
  },
  {
    id: 'elaynaoui-home',
    name: { en: 'El Aynaoui #8 — Home Jersey', fr: 'El Aynaoui n°8 — Maillot Domicile', ar: 'العيناوي 8# — القميص الأساسي' },
    desc: {
      en: 'Official home jersey with EL AYNAOUI 8 printing. Vision, range and thunder from midfield.',
      fr: 'Maillot domicile officiel avec flocage EL AYNAOUI 8. Vision, envergure et frappes de mule au milieu.',
      ar: 'القميص الأساسي الرسمي بطباعة EL AYNAOUI 8. رؤية وتمريرات وتسديدات صاروخية من الوسط.',
    },
    price: 1099,
    image: '/images/player.png',
    collections: ['players', 'home'],
    badge: 'wc',
    player: 'Neil El Aynaoui',
    number: 8,
  },
  {
    id: 'home-fan-26',
    name: { en: 'Supporter Home Jersey 2026', fr: 'Maillot Supporter Domicile 2026', ar: 'قميص المشجعين الأساسي 2026' },
    desc: {
      en: 'Fan-version of the 2026 home kit — same look, relaxed fit, terrace-friendly price.',
      fr: 'Version supporter du kit domicile 2026 — même look, coupe décontractée, prix tribune.',
      ar: 'نسخة المشجعين من الطقم الأساسي 2026 — نفس المظهر، قصة مريحة وسعر مناسب.',
    },
    price: 649,
    image: '/images/jersey-home.png',
    collections: ['supporter', 'home'],
  },
  {
    id: 'away-fan-26',
    name: { en: 'Supporter Away Jersey 2026', fr: 'Maillot Supporter Extérieur 2026', ar: 'قميص المشجعين الاحتياطي 2026' },
    desc: {
      en: 'Fan-version of the white away kit with zellige chest print. Relaxed fit for the stands.',
      fr: 'Version supporter du kit extérieur blanc avec imprimé zellige. Coupe décontractée pour les tribunes.',
      ar: 'نسخة المشجعين من الطقم الأبيض بطبعة الزليج. قصة مريحة للمدرجات.',
    },
    price: 649,
    image: '/images/jersey-away.png',
    collections: ['supporter', 'away'],
  },
  {
    id: 'supporter-tee',
    name: { en: 'Green Star Supporter Tee', fr: 'T-shirt Supporter Étoile Verte', ar: 'تيشرت المشجعين بالنجمة الخضراء' },
    desc: {
      en: 'Heavyweight cotton tee with the bold green star. The essential for every derby.',
      fr: 'T-shirt en coton épais avec la grande étoile verte. L’essentiel de chaque derby.',
      ar: 'تيشرت قطني سميك بالنجمة الخضراء الكبيرة. قطعة أساسية لكل ديربي.',
    },
    price: 299,
    compareAt: 349,
    image: '/images/supporter.png',
    collections: ['supporter'],
    badge: 'promo',
  },
  {
    id: 'training-top-26',
    name: { en: 'Pro Training Quarter-Zip 2026', fr: 'Haut d’Entraînement Pro 2026', ar: 'سترة التدريب الاحترافية 2026' },
    desc: {
      en: 'The exact quarter-zip worn by the squad at the Mohammed VI Complex. Thermo-regulating performance knit.',
      fr: 'Le quart-zip exact porté par l’équipe au Complexe Mohammed VI. Maille performance thermorégulatrice.',
      ar: 'نفس السترة التي يرتديها المنتخب في مركب محمد السادس. نسيج رياضي منظم للحرارة.',
    },
    price: 549,
    image: '/images/training.png',
    collections: ['training'],
    badge: 'new',
  },
  {
    id: 'training-shorts-26',
    name: { en: 'Training Shorts 2026', fr: 'Short d’Entraînement 2026', ar: 'شورت التدريب 2026' },
    desc: {
      en: 'Lightweight woven training shorts with zip pockets and green side taping.',
      fr: 'Short d’entraînement léger avec poches zippées et bandes latérales vertes.',
      ar: 'شورت تدريب خفيف بجيوب بسحّاب وشريط جانبي أخضر.',
    },
    price: 299,
    image: '/images/training.png',
    collections: ['training'],
  },
  {
    id: 'anthem-tracksuit',
    name: { en: 'Anthem Tracksuit 2026', fr: 'Survêtement Anthem 2026', ar: 'بدلة النشيد الرياضية 2026' },
    desc: {
      en: 'The pre-match anthem jacket and pants worn during the walk-out. Full-zip, ribbed cuffs, embroidered star.',
      fr: 'La veste et le pantalon portés à l’entrée des joueurs. Zip intégral, poignets côtelés, étoile brodée.',
      ar: 'جاكيت وسروال ما قبل المباراة كما يرتديه اللاعبون عند الدخول. سحّاب كامل ونجمة مطرزة.',
    },
    price: 899,
    image: '/images/training.png',
    collections: ['training'],
  },
  {
    id: 'zellige-hoodie',
    name: { en: 'Zellige Heritage Hoodie', fr: 'Hoodie Héritage Zellige', ar: 'هودي التراث زليج' },
    desc: {
      en: 'Heavyweight cream hoodie with embroidered red star and green drawcords. Casablanca streetwear meets Fès craft.',
      fr: 'Hoodie épais crème avec étoile rouge brodée et cordons verts. Le streetwear de Casablanca rencontre l’artisanat de Fès.',
      ar: 'هودي كريمي سميك بنجمة حمراء مطرزة وأربطة خضراء. أناقة الدار البيضاء بلمسة صناع فاس.',
    },
    price: 599,
    image: '/images/lifestyle.png',
    collections: ['lifestyle'],
    badge: 'new',
  },
  {
    id: 'atlas-tee',
    name: { en: 'Atlas Lions Graphic Tee', fr: 'T-shirt Graphique Atlas Lions', ar: 'تيشرت أسود الأطلس' },
    desc: {
      en: 'Soft cotton tee with minimalist Atlas Lion linework. Everyday pride.',
      fr: 'T-shirt en coton doux avec illustration minimaliste du Lion de l’Atlas. La fierté au quotidien.',
      ar: 'تيشرت قطني ناعم برسم بسيط لأسد الأطلس. فخر يومي.',
    },
    price: 249,
    image: '/images/lifestyle.png',
    collections: ['lifestyle'],
  },
  {
    id: 'supporter-scarf',
    name: { en: 'Matchday Supporter Scarf', fr: 'Écharpe Supporter Jour de Match', ar: 'وشاح المشجعين ليوم المباراة' },
    desc: {
      en: 'Double-sided knitted scarf — DIMA MAGHRIB on one side, the star on the other.',
      fr: 'Écharpe tricotée double face — DIMA MAGHRIB d’un côté, l’étoile de l’autre.',
      ar: 'وشاح محبوك بوجهين — ديما مغرب من جهة والنجمة من الجهة الأخرى.',
    },
    price: 199,
    image: '/images/supporter.png',
    collections: ['supporter', 'lifestyle'],
    badge: 'promo',
    compareAt: 249,
  },
];

export const players = [
  { key: 'hakimi', name: 'Achraf Hakimi', number: 2, role: { en: 'Right Back · Captain', fr: 'Latéral Droit · Capitaine', ar: 'ظهير أيمن · القائد' }, productId: 'hakimi-home' },
  { key: 'diaz', name: 'Brahim Díaz', number: 10, role: { en: 'Attacking Midfielder', fr: 'Milieu Offensif', ar: 'وسط هجومي' }, productId: 'diaz-home' },
  { key: 'saibari', name: 'Ismael Saibari', number: 15, role: { en: 'Midfielder', fr: 'Milieu de Terrain', ar: 'وسط ميدان' }, productId: 'saibari-home' },
  { key: 'elaynaoui', name: 'Neil El Aynaoui', number: 8, role: { en: 'Central Midfielder', fr: 'Milieu Central', ar: 'وسط ارتكاز' }, productId: 'elaynaoui-home' },
];

export const byId = (id: string) => products.find((p) => p.id === id);
export const byCollection = (slug: string) => products.filter((p) => p.collections.includes(slug));
export const newArrivals = () => products.filter((p) => p.badge === 'new');
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
