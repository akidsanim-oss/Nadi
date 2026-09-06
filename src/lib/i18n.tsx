import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'en' | 'fr' | 'ar';

const dict: Record<string, Record<Lang, string>> = {
  // Announcement / shipping
  'ship.banner': {
    en: 'Ships from Casablanca, Morocco 🇲🇦 — import duties & taxes may apply at destination',
    fr: 'Expédié depuis Casablanca, Maroc 🇲🇦 — droits de douane et taxes applicables à destination',
    ar: 'يُشحن من الدار البيضاء، المغرب 🇲🇦 — قد تُطبق رسوم الاستيراد والضرائب في بلد الوجهة',
  },
  'ship.free': {
    en: 'Free worldwide shipping over 800 MAD',
    fr: 'Livraison mondiale offerte dès 800 MAD',
    ar: 'شحن مجاني عالمياً للطلبات فوق 800 درهم',
  },
  // Nav
  'nav.home': { en: 'Home', fr: 'Accueil', ar: 'الرئيسية' },
  'nav.official': { en: 'Official Jerseys', fr: 'Maillots Officiels', ar: 'القمصان الرسمية' },
  'nav.players': { en: 'Players', fr: 'Joueurs', ar: 'اللاعبون' },
  'nav.training': { en: 'Training', fr: 'Entraînement', ar: 'التدريب' },
  'nav.lifestyle': { en: 'Lifestyle', fr: 'Lifestyle', ar: 'لايف ستايل' },
  'nav.cart': { en: 'Cart', fr: 'Panier', ar: 'السلة' },
  // Hero
  'hero.kicker': { en: 'Official Atlas Lions Store', fr: 'Boutique Officielle des Lions de l’Atlas', ar: 'المتجر الرسمي لأسود الأطلس' },
  'hero.title1': { en: 'DIMA', fr: 'DIMA', ar: 'ديما' },
  'hero.title2': { en: 'MAGHRIB', fr: 'MAGHRIB', ar: 'مغرب' },
  'hero.sub': {
    en: 'Official jerseys, fan kits and training apparel of the Moroccan national team — shipped worldwide from Morocco.',
    fr: 'Maillots officiels, tenues supporters et vêtements d’entraînement de l’équipe nationale du Maroc — expédiés dans le monde entier depuis le Maroc.',
    ar: 'القمصان الرسمية وأطقم المشجعين وملابس التدريب للمنتخب المغربي — تُشحن إلى جميع أنحاء العالم من المغرب.',
  },
  'hero.cta1': { en: 'Shop Official Jerseys', fr: 'Voir les Maillots Officiels', ar: 'تسوق القمصان الرسمية' },
  'hero.cta2': { en: 'Shop by Player', fr: 'Acheter par Joueur', ar: 'تسوق حسب اللاعب' },
  // Sections
  'sec.collections': { en: 'Shop the Collections', fr: 'Découvrez les Collections', ar: 'تسوق المجموعات' },
  'sec.collections.sub': {
    en: 'Seven ways to wear the red and green.',
    fr: 'Sept façons de porter le rouge et le vert.',
    ar: 'سبع طرق لارتداء الأحمر والأخضر.',
  },
  'sec.new': { en: 'New Arrivals', fr: 'Nouveautés', ar: 'وصل حديثاً' },
  'sec.new.sub': {
    en: 'Fresh drops from the 2026 kit collection.',
    fr: 'Les dernières sorties de la collection 2026.',
    ar: 'أحدث الإصدارات من تشكيلة 2026.',
  },
  'sec.players': { en: 'Shop by Player', fr: 'Acheter par Joueur', ar: 'تسوق حسب اللاعب' },
  'sec.players.sub': {
    en: 'Wear the name of the lions leading the pride.',
    fr: 'Portez le nom des lions qui mènent la meute.',
    ar: 'ارتدِ اسم الأسود الذين يقودون الكتيبة.',
  },
  'sec.viewall': { en: 'View all', fr: 'Voir tout', ar: 'عرض الكل' },
  // World Cup
  'wc.kicker': { en: 'Limited Edition', fr: 'Édition Limitée', ar: 'إصدار محدود' },
  'wc.title': { en: 'World Cup 2026 Collection', fr: 'Collection Coupe du Monde 2026', ar: 'مجموعة كأس العالم 2026' },
  'wc.sub': {
    en: 'Celebrate the Atlas Lions’ historic World Cup 2026 campaign. Commemorative jerseys featuring Brahim Díaz, Achraf Hakimi, Ismael Saibari and Neil El Aynaoui.',
    fr: 'Célébrez l’épopée historique des Lions de l’Atlas à la Coupe du Monde 2026. Maillots commémoratifs de Brahim Díaz, Achraf Hakimi, Ismael Saibari et Neil El Aynaoui.',
    ar: 'احتفل بمسيرة أسود الأطلس التاريخية في كأس العالم 2026. قمصان تذكارية تحمل أسماء إبراهيم دياز وأشرف حكيمي وإسماعيل الصيباري ونيل العيناوي.',
  },
  'wc.cta': { en: 'Achetez Maintenant', fr: 'Achetez Maintenant', ar: 'Achetez Maintenant' },
  'promo.code': {
    en: 'Use code DIMA26 for 15% off player jerseys',
    fr: 'Code DIMA26 : -15% sur les maillots joueurs',
    ar: 'استخدم الرمز DIMA26 لخصم 15٪ على قمصان اللاعبين',
  },
  // Value props
  'vp.authentic': { en: '100% Authentic Kits', fr: 'Maillots 100% Authentiques', ar: 'أطقم أصلية 100٪' },
  'vp.authentic.sub': {
    en: 'Sourced directly from official suppliers in Morocco.',
    fr: 'Provenant directement des fournisseurs officiels au Maroc.',
    ar: 'من الموردين الرسميين في المغرب مباشرة.',
  },
  'vp.ship': { en: 'Ships from Morocco', fr: 'Expédié du Maroc', ar: 'يُشحن من المغرب' },
  'vp.ship.sub': {
    en: 'Dispatched from Casablanca within 48h. Import duties & taxes may apply at destination.',
    fr: 'Expédié de Casablanca sous 48h. Droits de douane et taxes applicables à destination.',
    ar: 'يُرسل من الدار البيضاء خلال 48 ساعة. قد تُطبق رسوم وضرائب الاستيراد في بلد الوجهة.',
  },
  'vp.returns': { en: '30-Day Returns', fr: 'Retours sous 30 Jours', ar: 'إرجاع خلال 30 يوماً' },
  'vp.returns.sub': {
    en: 'Easy returns and exchanges on unworn items.',
    fr: 'Retours et échanges faciles sur les articles non portés.',
    ar: 'إرجاع واستبدال سهل للمنتجات غير المستعملة.',
  },
  // Product
  'p.add': { en: 'Add to Cart', fr: 'Ajouter au Panier', ar: 'أضف إلى السلة' },
  'p.added': { en: 'Added ✓', fr: 'Ajouté ✓', ar: 'تمت الإضافة ✓' },
  'p.size': { en: 'Size', fr: 'Taille', ar: 'المقاس' },
  'p.qty': { en: 'Quantity', fr: 'Quantité', ar: 'الكمية' },
  'p.details': { en: 'Details', fr: 'Détails', ar: 'التفاصيل' },
  'p.shipping': { en: 'Shipping & Duties', fr: 'Livraison & Douanes', ar: 'الشحن والجمارك' },
  'p.shipping.body': {
    en: 'All orders ship from Casablanca, Morocco 🇲🇦. International orders may be subject to import duties and taxes, payable by the recipient upon arrival in the destination country.',
    fr: 'Toutes les commandes sont expédiées de Casablanca, Maroc 🇲🇦. Les commandes internationales peuvent être soumises à des droits de douane et taxes, à la charge du destinataire à l’arrivée dans le pays de destination.',
    ar: 'تُشحن جميع الطلبات من الدار البيضاء، المغرب 🇲🇦. قد تخضع الطلبات الدولية لرسوم استيراد وضرائب يدفعها المستلم عند الوصول إلى بلد الوجهة.',
  },
  'p.related': { en: 'You may also like', fr: 'Vous aimerez aussi', ar: 'قد يعجبك أيضاً' },
  'p.new': { en: 'NEW', fr: 'NOUVEAU', ar: 'جديد' },
  'p.wc': { en: 'WC 2026', fr: 'CDM 2026', ar: 'مونديال 2026' },
  'p.promo': { en: 'PROMO', fr: 'PROMO', ar: 'تخفيض' },
  // Cart
  'cart.title': { en: 'Your Cart', fr: 'Votre Panier', ar: 'سلة التسوق' },
  'cart.empty': { en: 'Your cart is empty', fr: 'Votre panier est vide', ar: 'سلتك فارغة' },
  'cart.empty.sub': {
    en: 'The lions are waiting — grab a jersey.',
    fr: 'Les lions vous attendent — choisissez un maillot.',
    ar: 'الأسود في انتظارك — اختر قميصك.',
  },
  'cart.continue': { en: 'Continue Shopping', fr: 'Continuer vos Achats', ar: 'مواصلة التسوق' },
  'cart.subtotal': { en: 'Subtotal', fr: 'Sous-total', ar: 'المجموع الفرعي' },
  'cart.duties': {
    en: 'Ships from Morocco. Import duties & taxes calculated at destination.',
    fr: 'Expédié du Maroc. Droits et taxes d’importation calculés à destination.',
    ar: 'يُشحن من المغرب. تُحتسب رسوم وضرائب الاستيراد في بلد الوجهة.',
  },
  'cart.checkout': { en: 'Checkout', fr: 'Passer la Commande', ar: 'إتمام الشراء' },
  'cart.remove': { en: 'Remove', fr: 'Supprimer', ar: 'حذف' },
  // Checkout
  'co.title': { en: 'Checkout', fr: 'Paiement', ar: 'إتمام الطلب' },
  'co.contact': { en: 'Contact', fr: 'Contact', ar: 'معلومات التواصل' },
  'co.email': { en: 'Email address', fr: 'Adresse e-mail', ar: 'البريد الإلكتروني' },
  'co.shipto': { en: 'Shipping Address', fr: 'Adresse de Livraison', ar: 'عنوان الشحن' },
  'co.fname': { en: 'First name', fr: 'Prénom', ar: 'الاسم الشخصي' },
  'co.lname': { en: 'Last name', fr: 'Nom', ar: 'الاسم العائلي' },
  'co.address': { en: 'Address', fr: 'Adresse', ar: 'العنوان' },
  'co.city': { en: 'City', fr: 'Ville', ar: 'المدينة' },
  'co.zip': { en: 'Postal code', fr: 'Code postal', ar: 'الرمز البريدي' },
  'co.country': { en: 'Country', fr: 'Pays', ar: 'البلد' },
  'co.payment': { en: 'Payment', fr: 'Paiement', ar: 'الدفع' },
  'co.card': { en: 'Card number', fr: 'Numéro de carte', ar: 'رقم البطاقة' },
  'co.exp': { en: 'MM/YY', fr: 'MM/AA', ar: 'شهر/سنة' },
  'co.cvc': { en: 'CVC', fr: 'CVC', ar: 'CVC' },
  'co.place': { en: 'Place Order', fr: 'Confirmer la Commande', ar: 'تأكيد الطلب' },
  'co.summary': { en: 'Order Summary', fr: 'Récapitulatif', ar: 'ملخص الطلب' },
  'co.shipping': { en: 'Shipping', fr: 'Livraison', ar: 'الشحن' },
  'co.shipping.free': { en: 'Free', fr: 'Offerte', ar: 'مجاني' },
  'co.total': { en: 'Total', fr: 'Total', ar: 'الإجمالي' },
  'co.duties.note': {
    en: 'Orders ship from Morocco 🇲🇦. For international destinations, import duties and taxes are not included and may be collected on delivery.',
    fr: 'Les commandes sont expédiées du Maroc 🇲🇦. Pour les destinations internationales, les droits et taxes d’importation ne sont pas inclus et peuvent être perçus à la livraison.',
    ar: 'تُشحن الطلبات من المغرب 🇲🇦. بالنسبة للوجهات الدولية، رسوم وضرائب الاستيراد غير مشمولة وقد تُحصَّل عند التسليم.',
  },
  'co.success.title': { en: 'Shukran! Order Confirmed', fr: 'Choukran ! Commande Confirmée', ar: 'شكراً! تم تأكيد الطلب' },
  'co.success.body': {
    en: 'Your order is being prepared in Casablanca and will ship within 48 hours. A confirmation email is on its way.',
    fr: 'Votre commande est en préparation à Casablanca et sera expédiée sous 48 heures. Un e-mail de confirmation vous a été envoyé.',
    ar: 'يتم تجهيز طلبك في الدار البيضاء وسيُشحن خلال 48 ساعة. تم إرسال بريد إلكتروني للتأكيد.',
  },
  'co.success.order': { en: 'Order number', fr: 'Numéro de commande', ar: 'رقم الطلب' },
  'co.back': { en: 'Back to Store', fr: 'Retour à la Boutique', ar: 'العودة إلى المتجر' },
  // Footer
  'f.tagline': {
    en: 'The unofficial-official home of Atlas Lions supporters worldwide. Shipped with pride from Casablanca.',
    fr: 'La maison des supporters des Lions de l’Atlas dans le monde entier. Expédié avec fierté depuis Casablanca.',
    ar: 'بيت مشجعي أسود الأطلس حول العالم. يُشحن بفخر من الدار البيضاء.',
  },
  'f.shop': { en: 'Shop', fr: 'Boutique', ar: 'المتجر' },
  'f.help': { en: 'Help', fr: 'Aide', ar: 'المساعدة' },
  'f.shipping': { en: 'Shipping & Duties', fr: 'Livraison & Douanes', ar: 'الشحن والجمارك' },
  'f.returns': { en: 'Returns', fr: 'Retours', ar: 'الإرجاع' },
  'f.size': { en: 'Size Guide', fr: 'Guide des Tailles', ar: 'دليل المقاسات' },
  'f.contact': { en: 'Contact Us', fr: 'Nous Contacter', ar: 'اتصل بنا' },
  'f.newsletter': { en: 'Join the Pride', fr: 'Rejoignez la Meute', ar: 'انضم إلى الكتيبة' },
  'f.newsletter.sub': {
    en: 'Kit drops, player editions and matchday promos — straight to your inbox.',
    fr: 'Nouveaux maillots, éditions joueurs et promos jour de match — directement dans votre boîte mail.',
    ar: 'إصدارات جديدة وقمصان اللاعبين وعروض أيام المباريات — مباشرة إلى بريدك.',
  },
  'f.subscribe': { en: 'Subscribe', fr: 'S’abonner', ar: 'اشترك' },
  'f.subscribed': { en: 'Subscribed! Dima Maghrib 🦁', fr: 'Inscrit ! Dima Maghrib 🦁', ar: 'تم الاشتراك! ديما مغرب 🦁' },
  'f.rights': {
    en: 'Independent fan store. Not affiliated with FRMF. Ships from Morocco — import duties & taxes may apply.',
    fr: 'Boutique de fans indépendante. Non affiliée à la FRMF. Expédié du Maroc — droits et taxes d’importation applicables.',
    ar: 'متجر مشجعين مستقل. غير تابع للجامعة الملكية المغربية لكرة القدم. يُشحن من المغرب — قد تُطبق رسوم وضرائب الاستيراد.',
  },
  'buy.now': { en: 'Achetez Maintenant', fr: 'Achetez Maintenant', ar: 'Achetez Maintenant' },
  'from': { en: 'From', fr: 'Dès', ar: 'ابتداءً من' },
  'products.count': { en: 'products', fr: 'produits', ar: 'منتجات' },
  'notfound': { en: 'Page not found', fr: 'Page introuvable', ar: 'الصفحة غير موجودة' },
};

const langMeta: Record<Lang, { label: string; dir: 'ltr' | 'rtl'; locale: string }> = {
  en: { label: 'EN', dir: 'ltr', locale: 'en-US' },
  fr: { label: 'FR', dir: 'ltr', locale: 'fr-FR' },
  ar: { label: 'عربي', dir: 'rtl', locale: 'ar-MA' },
};

interface I18nCtx {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  fmtPrice: (mad: number) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('atlas-lang');
    return saved === 'fr' || saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    document.documentElement.dir = langMeta[lang].dir;
    document.documentElement.lang = lang;
    localStorage.setItem('atlas-lang', lang);
  }, [lang]);

  const t = (key: string) => dict[key]?.[lang] ?? dict[key]?.en ?? key;

  const fmtPrice = (mad: number) => {
    const n = mad.toLocaleString(langMeta[lang].locale);
    return lang === 'ar' ? `${n} د.م.` : `${n} MAD`;
  };

  return (
    <Ctx.Provider value={{ lang, dir: langMeta[lang].dir, setLang: setLangState, t, fmtPrice }}>
      {children}
    </Ctx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useI18n outside provider');
  return ctx;
}

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'عربي' },
];
