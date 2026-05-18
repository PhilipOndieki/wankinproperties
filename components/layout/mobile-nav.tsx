'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Phone, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CONTACT_PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';

const navLinks = [
  { href: '/properties', label: 'For Sale' },
  { href: '/properties?category=juja-farm', label: 'Juja Farm' },
  { href: '/properties?category=gongoni-malindi', label: 'Coastal Plots' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col p-0">
        <SheetHeader className="border-b border-wankin-gray-200 px-6 py-4">
          <SheetTitle className="text-left font-display text-wankin-blue">
            Wankin Properties
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile navigation">
          <ul className="space-y-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-lg px-3 py-3 text-base font-medium text-wankin-gray-700 hover:bg-wankin-cream hover:text-wankin-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-wankin-gray-200 px-6 py-6 space-y-3">
          <a
            href={`tel:${CONTACT_PHONE_DISPLAY.replace(/\s/g, '')}`}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-wankin-blue hover:bg-wankin-cream transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {CONTACT_PHONE_DISPLAY}
          </a>
          <Button asChild variant="whatsapp" size="lg" className="w-full">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" className="w-full">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Request a Property
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
