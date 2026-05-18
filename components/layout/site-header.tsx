'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';
import { CONTACT_PHONE_DISPLAY } from '@/lib/constants';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/properties', label: 'For Sale' },
  { href: '/properties', label: 'Locations' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!(entry?.isIntersecting ?? true));
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />
      <header
        className={cn(
          'sticky top-0 z-40 w-full bg-white transition-shadow duration-200',
          scrolled ? 'shadow-sm' : 'shadow-none',
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-wankin-blue focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:no-underline"
        >
          Skip to content
        </a>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Wankin Properties Limited home"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue focus-visible:ring-offset-2 rounded-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-wankin-blue">
              <span className="font-display text-lg font-bold text-white leading-none">W</span>
            </div>
            <span className="hidden font-display text-lg font-bold text-wankin-ink sm:block">
              Wankin<span className="text-wankin-blue"> Properties</span>
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-wankin-gray-700 hover:bg-wankin-cream hover:text-wankin-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:+254758300900`}
              className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-wankin-blue hover:text-wankin-blue-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue focus-visible:ring-offset-2 rounded-lg px-2 py-1"
              aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <Button asChild className="hidden lg:flex">
              <Link href="/contact">Request a Property</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
