import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListingCard } from '@/components/listings/listing-card';
import {
  getListings,
  getCoastalListings,
  getFeaturedDeals,
} from '@/lib/listings';

export function ListingTabs() {
  const newListings = getListings().slice(0, 3);
  const coastalListings = getCoastalListings().slice(0, 3);
  const featuredDeals = getFeaturedDeals().slice(0, 3);

  return (
    <section
      aria-labelledby="listings-tabs-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="listings-tabs-heading" className="sr-only">
          Property listings
        </h2>
        <Tabs defaultValue="new">
          <TabsList aria-label="Listing categories">
            <TabsTrigger value="new">New plots for sale</TabsTrigger>
            <TabsTrigger value="coastal">Coastal listings</TabsTrigger>
            <TabsTrigger value="deals">Featured deals</TabsTrigger>
          </TabsList>

          <TabsContent value="new">
            <ListingGrid listings={newListings} />
          </TabsContent>
          <TabsContent value="coastal">
            <ListingGrid listings={coastalListings} />
          </TabsContent>
          <TabsContent value="deals">
            <ListingGrid listings={featuredDeals} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ListingGrid({ listings }: { listings: ReturnType<typeof getListings> }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {listings.map((listing, i) => (
        <ListingCard key={listing.slug} listing={listing} priority={i === 0} />
      ))}
      <Link
        href="/properties"
        className="group flex flex-col items-center justify-center gap-4 rounded-xl bg-wankin-blue p-8 text-center text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-wankin-blue min-h-[200px]"
        aria-label="Browse all property listings"
      >
        <div className="rounded-full bg-white/20 p-4">
          <ArrowRight
            className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="font-display text-lg font-bold">Browse all listings</p>
          <p className="mt-1 text-sm text-blue-200">
            See every available plot
          </p>
        </div>
      </Link>
    </div>
  );
}
