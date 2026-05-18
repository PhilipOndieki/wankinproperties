import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  OFFICE_ADDRESS,
  SITE_TAGLINE,
  SOCIAL_LINKS,
  WHATSAPP_URL,
} from '@/lib/constants';

const quickLinks = [
  { href: '/properties', label: 'For Sale' },
  { href: '/properties?category=juja-farm', label: 'Juja Farm Plots' },
  { href: '/properties?category=gongoni-malindi', label: 'Coastal Plots' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const locations = [
  { href: '/properties?category=juja-farm', label: 'Juja Farm' },
  { href: '/properties?category=juja-farm-athi', label: 'Juja Farm Athi' },
  { href: '/properties?category=mwalimu-farm', label: 'Mwalimu Farm' },
  { href: '/properties?category=makuyu-mananja', label: 'Makuyu' },
  { href: '/properties?category=gongoni-malindi', label: 'Gongoni Malindi' },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wankin-blue-deep text-white" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-wankin-blue">
                <span className="font-display text-lg font-bold text-white leading-none">W</span>
              </div>
              <span className="font-display text-lg font-bold text-white">
                Wankin Properties
              </span>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              {SITE_TAGLINE}
            </p>
            <p className="text-sm text-blue-300 leading-relaxed">
              We help Kenyans buy land with confidence. Real titles. Transparent process. Fast transactions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-wankin-blue-deep rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-4">
              Locations
            </h3>
            <ul className="space-y-2" role="list">
              {locations.map((loc) => (
                <li key={loc.href}>
                  <Link
                    href={loc.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-wankin-blue-deep rounded"
                  >
                    {loc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-4">
              Contact
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={`tel:+254758300900`}
                  className="flex items-start gap-2 text-sm text-blue-200 hover:text-white transition-colors"
                  aria-label={`Call ${CONTACT_PHONE_DISPLAY}`}
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-start gap-2 text-sm text-blue-200 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-[#25D366] hover:text-green-300 transition-colors"
                >
                  <svg
                    className="h-4 w-4 mt-0.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.836L0 24l6.335-1.637A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.373l-.36-.213-3.727.977.996-3.636-.235-.374A9.818 9.818 0 1112 21.818z" />
                  </svg>
                  WhatsApp us
                </a>
              </li>
              <li>
                <address className="flex items-start gap-2 text-sm text-blue-200 not-italic">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                  {OFFICE_ADDRESS}
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-blue-400">
            &copy; {currentYear} Wankin Properties Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4" aria-label="Social media links">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wankin Properties on Facebook"
              className="text-blue-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wankin Properties on Instagram"
              className="text-blue-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wankin Properties on TikTok"
              className="text-blue-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
