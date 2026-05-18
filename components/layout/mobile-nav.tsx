'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Phone, MessageCircle, Mail, ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CONTACT_PHONE_DISPLAY, WHATSAPP_URL, CONTACT_EMAIL } from '@/lib/constants';
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

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          className="lg:hidden text-wankin-ink hover:bg-wankin-cream"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col p-0 w-[300px] sm:w-[340px]">
        {/* Header */}
        <SheetHeader className="bg-[#1E2A78] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Wankin Properties logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
            </div>
            <div>
              <SheetTitle className="text-white font-display font-bold text-sm tracking-wide text-left leading-tight">
                WANKIN PROPERTIES
              </SheetTitle>
              <p className="text-blue-300 text-[10px] tracking-[2px] mt-0.5">
                LIMITED · KENYA
              </p>
            </div>
          </div>
        </SheetHeader>

        {/* Nav links */}
        <nav
          className="flex-1 overflow-y-auto px-4 py-4"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-0.5" role="list">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.label}>
                  <button
                    onClick={() => setLocationsOpen((v) => !v)}
                    aria-expanded={locationsOpen}
                    className="w-full flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-wankin-gray-700 hover:bg-wankin-cream hover:text-wankin-blue-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        locationsOpen && 'rotate-180',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {locationsOpen && (
                    <ul className="mt-0.5 ml-3 border-l-2 border-wankin-blue/20 pl-3 space-y-0.5">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-3 py-2 text-sm text-wankin-gray-700 hover:bg-wankin-cream hover:text-wankin-blue-dark transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-wankin-gray-700 hover:bg-wankin-cream hover:text-wankin-blue-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Contact footer */}
        <div className="border-t border-wankin-gray-200 px-4 py-4 space-y-2.5 bg-wankin-cream">
          <a
            href="tel:+254758300900"
            className="flex items-center gap-3 rounded-lg bg-wankin-blue px-4 py-3 text-sm font-bold text-white hover:bg-wankin-blue-dark transition-colors"
            aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            {CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white hover:bg-[#1da851] transition-colors"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Chat on WhatsApp
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-3 rounded-lg border border-wankin-gray-200 bg-white px-4 py-3 text-sm font-medium text-wankin-gray-700 hover:bg-wankin-cream transition-colors"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
          <Button asChild size="lg" className="w-full mt-1">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Request a Property
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}