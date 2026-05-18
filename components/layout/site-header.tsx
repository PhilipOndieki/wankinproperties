'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, Clock, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import { MobileNav } from './mobile-nav';
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_EMAIL,
  OFFICE_HOURS,
  OFFICE_ADDRESS,
  WHATSAPP_URL,
} from '@/lib/constants';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/properties', label: 'For Sale' },
  {
    href: '/properties',
    label: 'Locations',
    children: [
      { href: '/properties?category=juja-farm', label: 'Juja Farm' },
      { href: '/properties?category=juja-farm-athi', label: 'Juja Farm Athi' },
      { href: '/properties?category=mwalimu-farm', label: 'Mwalimu Farm' },
      { href: '/properties?category=makuyu-mananja', label: 'Makuyu' },
      { href: '/properties?category=gongoni-malindi', label: 'Gongoni Malindi' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-3.5 w-3.5"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.836L0 24l6.335-1.637A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.373l-.36-.213-3.727.977.996-3.636-.235-.374A9.818 9.818 0 1112 21.818z" />
  </svg>
);

function DropdownMenu({
  children,
  label,
  href,
  isActive,
}: {
  children: { href: string; label: string }[];
  label: string;
  href: string;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-full flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'flex items-center gap-1 px-4 h-full text-sm font-medium border-b-[3px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue focus-visible:ring-inset',
          isActive
            ? 'text-wankin-blue-dark border-wankin-blue-dark font-bold'
            : 'text-wankin-gray-700 border-transparent hover:text-wankin-blue-dark hover:border-wankin-blue-dark/40',
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-0 w-52 bg-white border border-wankin-gray-200 rounded-b-xl rounded-tr-xl shadow-lg z-50 py-1 overflow-hidden">
          {children.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-wankin-gray-700 hover:bg-wankin-cream hover:text-wankin-blue-dark transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > 80) {
        setTopBarVisible(false);
      } else {
        setTopBarVisible(true);
      }

      setScrolled(currentY > 10);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0]!);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-wankin-blue focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-shadow duration-300',
          scrolled && 'shadow-[0_2px_16px_rgba(15,26,79,0.12)]',
        )}
      >
        {/* ── TOP CONTACT BAR ── */}
        <div
          className={cn(
            'bg-[#0F1A4F] overflow-hidden transition-all duration-300 ease-in-out',
            topBarVisible ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0',
          )}
          aria-hidden={!topBarVisible}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
            {/* Left info */}
            <div className="hidden lg:flex items-center gap-5">
              <span className="flex items-center gap-1.5 text-blue-200 text-xs">
                <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
                {OFFICE_HOURS}
              </span>
              <span className="w-px h-3 bg-white/20" aria-hidden="true" />
              <span className="flex items-center gap-1.5 text-blue-200 text-xs">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                {OFFICE_ADDRESS}
              </span>
            </div>

            {/* Right contact strip */}
            <div className="flex items-center ml-auto">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hidden sm:flex items-center gap-1.5 text-blue-200 hover:text-white text-xs px-4 h-10 border-l border-white/10 transition-colors"
                aria-label={`Email us at ${CONTACT_EMAIL}`}
              >
                <Mail className="h-3 w-3 shrink-0" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#4ade80] hover:text-green-300 text-xs font-semibold px-4 h-10 border-l border-white/10 transition-colors"
                aria-label="Chat with us on WhatsApp"
              >
                <WhatsAppIcon />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a>
              <a
                href="tel:+254758300900"
                className="flex items-center gap-1.5 text-white text-xs font-bold px-4 h-10 bg-wankin-blue border-l border-white/10 hover:bg-wankin-blue-dark transition-colors"
                aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}
              >
                <Phone className="h-3 w-3 shrink-0" aria-hidden="true" />
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>

        {/* ── MAIN NAV BAR ── */}
        <div className="flex w-full">
          {/* Brand panel */}
          <div className="bg-[#1E2A78] flex-shrink-0">
            <Link
              href="/"
              aria-label="Wankin Properties Limited — home"
              className="flex items-center gap-3 px-6 lg:px-8 h-[72px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image
                  src="/logowankin.png"
                  alt="Wankin Properties logo"
                  width={44}
                  height={44}
                  className="w-11 h-11 object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-display font-bold text-[15px] tracking-wide leading-tight">
                  WANKIN PROPERTIES
                </div>
                <div className="text-blue-300 text-[10px] tracking-[3px] mt-0.5">
                  LIMITED · KENYA
                </div>
              </div>
            </Link>
          </div>

          {/* Nav links panel */}
          <div className="bg-white flex-1 flex items-center justify-between px-4 lg:px-8 border-b border-wankin-gray-200 h-[72px]">
            {/* Desktop links */}
            <nav
              className="hidden lg:flex items-center h-full"
              aria-label="Main navigation"
            >
              {navLinks.map((link) =>
                link.children ? (
                  <DropdownMenu
                    key={link.label}
                    href={link.href}
                    label={link.label}
                    isActive={isActive(link.href)}
                  >
                    {link.children}
                  </DropdownMenu>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center px-4 h-full text-sm font-medium border-b-[3px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue focus-visible:ring-inset',
                      isActive(link.href)
                        ? 'text-wankin-blue-dark border-wankin-blue-dark font-bold'
                        : 'text-wankin-gray-700 border-transparent hover:text-wankin-blue-dark hover:border-wankin-blue-dark/40',
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* CTA + mobile trigger */}
            <div className="flex items-center gap-3 ml-auto">
              <Link
                href="/contact"
                className="hidden lg:flex items-center gap-2 bg-wankin-red hover:bg-wankin-red-dark text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-red focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Request a Property
              </Link>

              {/* Mobile nav trigger */}
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}