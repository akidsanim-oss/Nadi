import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Instagram, Twitter, Youtube } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { collections } from '../lib/products';

export default function Footer() {
  const { t, lang } = useI18n();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <footer className="mt-20 border-t border-line bg-coal zellige">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl text-sand">
              ATLAS<span className="text-crimson"> ELEVEN</span>
            </div>
            <p className="mt-3 text-sm text-smoke leading-relaxed">{t('f.tagline')}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gold">
              <MapPin className="h-4 w-4" />
              Casablanca, Morocco 🇲🇦
            </div>
            <div className="mt-4 flex gap-3">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="p-2 rounded-full border border-line text-smoke hover:text-gold hover:border-gold transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-cond uppercase tracking-widest text-gold text-sm mb-4">{t('f.shop')}</h4>
            <ul className="space-y-2.5">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link to={`/collection/${c.slug}`} className="text-sm text-smoke hover:text-sand transition-colors">
                    {c.name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-cond uppercase tracking-widest text-gold text-sm mb-4">{t('f.help')}</h4>
            <ul className="space-y-2.5 text-sm text-smoke">
              <li>{t('f.shipping')}</li>
              <li>{t('f.returns')}</li>
              <li>{t('f.size')}</li>
              <li>{t('f.contact')}</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-cond uppercase tracking-widest text-gold text-sm mb-4">{t('f.newsletter')}</h4>
            <p className="text-sm text-smoke mb-4">{t('f.newsletter.sub')}</p>
            {subscribed ? (
              <div className="rounded-lg bg-palm/20 border border-palm text-sand text-sm px-4 py-3">
                {t('f.subscribed')}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubscribed(true);
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('co.email')}
                  className="flex-1 min-w-0 rounded-lg bg-night border border-line px-3 py-2.5 text-sm text-sand placeholder:text-smoke/60 focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-crimson hover:bg-blood text-sand text-sm font-bold px-4 py-2.5 transition-colors cursor-pointer"
                >
                  {t('f.subscribe')}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-smoke/70">
          <span>© 2026 Atlas Eleven · {t('f.rights')}</span>
          <span className="font-cond tracking-widest uppercase text-gold/80">ديما مغرب · Dima Maghrib</span>
        </div>
      </div>
    </footer>
  );
}
