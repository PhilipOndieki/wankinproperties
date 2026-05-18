import React from 'react';
import type { Metadata } from 'next';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  OFFICE_ADDRESS,
  OFFICE_HOURS,
  SITE_NAME,
  WHATSAPP_URL,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Wankin Properties Limited is a commercial real estate agency in Juja, Kenya. We help Kenyans buy and sell land with confidence.',
};

const agentJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: SITE_NAME,
  description:
    'We help Kenyans buy and sell land with confidence. Our team knows the local market, handles transactions transparently, and stands behind every title deed we deliver.',
  url: 'https://wankinproperties.co.ke/about',
  telephone: CONTACT_PHONE_DISPLAY,
  email: CONTACT_EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unaitas Building, 1st Floor, Room FF6',
    addressLocality: 'Juja',
    addressRegion: 'Kiambu County',
    addressCountry: 'KE',
  },
  openingHours: 'Mo-Sa 08:00-18:00',
  areaServed: ['Juja', 'Makuyu', 'Ruai', 'Malindi', 'Nairobi'],
};

const pillars = [
  {
    title: 'Our Mission',
    body: 'Make land ownership accessible to every Kenyan. We cut through the noise, verify documents, and get buyers into titled land without the usual 6-month wait.',
  },
  {
    title: 'Our Approach',
    body: 'We source plots directly from landowners and project developers. We verify every title deed before we list. We walk buyers through the transfer process ourselves, from deposit to handover.',
  },
  {
    title: 'Our Promise',
    body: 'If the title deed is not ready, we do not sell it. If the location is not what we described, we refund. We stand behind every transaction we close.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentJsonLd) }}
      />

      <section
        aria-labelledby="about-hero-heading"
        className="bg-wankin-blue-dark py-20 text-white"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1
            id="about-hero-heading"
            className="font-display text-4xl font-extrabold sm:text-5xl"
          >
            Who we are
          </h1>
          <p className="mt-6 text-lg text-blue-200 leading-relaxed">
            Wankin Properties Limited is a commercial real estate agency based in Juja, Kenya. We help Kenyans buy and sell land with confidence. Our team knows the local market, handles transactions transparently, and stands behind every title deed we deliver.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="pillars-heading"
        className="bg-wankin-cream py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="pillars-heading" className="sr-only">
            Our mission, approach, and promise
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3" role="list">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl bg-white p-8 shadow-card"
                role="listitem"
              >
                <h3 className="font-display text-xl font-bold text-wankin-blue mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-wankin-gray-700 leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="office-heading"
        className="bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2
                id="office-heading"
                className="font-display text-3xl font-extrabold text-wankin-ink mb-6"
              >
                Visit our office
              </h2>
              <div className="space-y-4">
                <address className="not-italic space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-wankin-blue" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-wankin-ink">Office address</p>
                      <p className="text-sm text-wankin-gray-700">{OFFICE_ADDRESS}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 shrink-0 mt-0.5 text-wankin-blue" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-wankin-ink">Phone</p>
                      <a
                        href="tel:+254758300900"
                        className="text-sm text-wankin-blue hover:underline"
                      >
                        {CONTACT_PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 shrink-0 mt-0.5 text-wankin-blue" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-wankin-ink">Email</p>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-sm text-wankin-blue hover:underline"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 shrink-0 mt-0.5 text-wankin-blue" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-wankin-ink">Office hours</p>
                      <p className="text-sm text-wankin-gray-700">{OFFICE_HOURS}</p>
                    </div>
                  </div>
                </address>

                <div className="pt-4 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <a href="tel:+254758300900" aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}>
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Call now
                    </a>
                  </Button>
                  <Button asChild variant="whatsapp" size="lg">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      WhatsApp us
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-wankin-gray-200 aspect-video lg:aspect-auto lg:h-80">
              <iframe
                title="Wankin Properties office location"
                src="https://maps.google.com/maps?q=-1.0974,37.0144&z=15&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="team-heading"
        className="bg-wankin-cream py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              id="team-heading"
              className="font-display text-3xl font-extrabold text-wankin-ink"
            >
              Our team
            </h2>
            <p className="mt-4 text-sm text-wankin-gray-700">
              Team profiles coming soon. In the meantime, reach us directly.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
