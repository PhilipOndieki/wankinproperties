import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const locations = [
  {
    name: 'Juja Farm',
    category: 'juja-farm',
    imageSrc: 'https://placehold.co/400x300/1E40AF/FAF8F3?text=Juja+Farm',
    imageAlt: 'Green residential plots in Juja Farm, Kiambu County',
  },
  {
    name: 'Juja Farm Athi',
    category: 'juja-farm-athi',
    imageSrc: 'https://placehold.co/400x300/1E2A78/FAF8F3?text=Juja+Athi',
    imageAlt: 'Flat open plots at Juja Farm Athi near Nairobi',
  },
  {
    name: 'Mwalimu Farm',
    category: 'mwalimu-farm',
    imageSrc: 'https://placehold.co/400x300/16A34A/FAF8F3?text=Mwalimu+Farm',
    imageAlt: 'Established residential scheme at Mwalimu Farm, Juja',
  },
  {
    name: 'Makuyu',
    category: 'makuyu-mananja',
    imageSrc: 'https://placehold.co/400x300/374151/FAF8F3?text=Makuyu',
    imageAlt: 'Fertile farm land in Makuyu, Murang\'a County',
  },
  {
    name: 'Gongoni Malindi',
    category: 'gongoni-malindi',
    imageSrc: 'https://placehold.co/400x300/0F1A4F/FAF8F3?text=Malindi+Coast',
    imageAlt: 'Coastal plots near Malindi and the Indian Ocean',
  },
];

export function FeaturedLocations() {
  return (
    <section
      aria-labelledby="locations-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2
            id="locations-heading"
            className="font-display text-3xl font-extrabold text-wankin-ink sm:text-4xl"
          >
            Browse by location
          </h2>
          <Link
            href="/properties"
            className="hidden text-sm font-semibold text-wankin-blue hover:text-wankin-blue-dark sm:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue rounded"
          >
            View all
          </Link>
        </div>

        <div
          className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-5"
          role="list"
          aria-label="Property locations"
        >
          {locations.map((loc) => (
            <Link
              key={loc.category}
              href={`/properties?category=${loc.category}`}
              className="group relative flex-shrink-0 w-48 sm:w-auto overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue focus-visible:ring-offset-2"
              role="listitem"
              aria-label={`Browse ${loc.name} plots`}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={loc.imageSrc}
                  alt={loc.imageAlt}
                  fill
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-base font-bold text-white">
                    {loc.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
