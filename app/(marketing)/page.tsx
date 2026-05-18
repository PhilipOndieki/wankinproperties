import React from 'react';
import type { Metadata } from 'next';
import { HeroSearch } from '@/components/home/hero-search';
import { ListingTabs } from '@/components/home/listing-tabs';
import { WhyWankin } from '@/components/home/why-wankin';
import { FeaturedLocations } from '@/components/home/featured-locations';
import { Testimonials } from '@/components/home/testimonials';
import { CtaBanner } from '@/components/home/cta-banner';
import { CONTACT_PHONE_DISPLAY, OFFICE_ADDRESS, SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Prime Plots and Land for Sale in Kenya',
  description: SITE_DESCRIPTION,
};

const agentJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: 'https://wankinproperties.com',
  telephone: CONTACT_PHONE_DISPLAY,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unaitas Building, 1st Floor, Room FF6',
    addressLocality: 'Juja',
    addressRegion: 'Kiambu County',
    addressCountry: 'KE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -1.0974,
    longitude: 37.0144,
  },
  openingHours: 'Mo-Sa 08:00-18:00',
  areaServed: ['Juja', 'Makuyu', 'Ruai', 'Malindi', 'Nairobi'],
  sameAs: [
    'https://facebook.com/wankinproperties',
    'https://instagram.com/wankinproperties',
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentJsonLd) }}
      />

      <section
        aria-label="Hero"
        className="relative overflow-hidden bg-wankin-cream"
        style={{ minHeight: '520px' }}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 192V120l60-30 40 20 50-40 30 10 40-30 60 20 30-50 40 10 50-20 60 30 40-15 30 35 50-20 40 25 50-30 30 10 40-20 60 30 40-10 50 20 30-15 40 5 60-25 40 15 30 20 50-30 40 10 30-5V192H0z"
              fill="#1E40AF"
              fillOpacity="0.06"
            />
            <path
              d="M0 192V140l80-20 60 30 40-40 50 15 80-30 40 20 50-10 60 25 40-20 50 10 80-30 40 15 60-25 50 30 80-20 40 10 30 20V192H0z"
              fill="#1E40AF"
              fillOpacity="0.04"
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-wankin-ink sm:text-5xl md:text-6xl">
              Find your piece of Kenya.
            </h1>
            <p className="mt-5 text-base text-wankin-gray-700 sm:text-lg">
              Prime plots and land across Juja, Makuyu, Ruai, and the Malindi coast. Title deeds ready. Site visits free.
            </p>
          </div>
          <HeroSearch />
        </div>
      </section>

      <ListingTabs />
      <WhyWankin />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
