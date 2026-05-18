import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ListingCard } from '@/components/listings/listing-card';
import { ListingFilters } from '@/components/listings/listing-filters';
import {
  filterListings,
  isValidCategory,
  isValidSort,
  isValidStatus,
} from '@/lib/listings';
import type { ListingFilters as Filters } from '@/types/listing';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Plots and Land for Sale',
  description:
    'Browse all available plots for sale across Juja, Makuyu, Ruai, and Malindi. Filtered by category, price, and location.',
};

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

function getParam(searchParams: PageProps['searchParams'], key: string): string | undefined {
  const val = searchParams[key];
  if (Array.isArray(val)) return val[0];
  return val;
}

export default function PropertiesPage({ searchParams }: PageProps) {
  const category = getParam(searchParams, 'category');
  const location = getParam(searchParams, 'location');
  const minPrice = getParam(searchParams, 'minPrice');
  const maxPrice = getParam(searchParams, 'maxPrice');
  const status = getParam(searchParams, 'status');
  const sort = getParam(searchParams, 'sort');

  const filters: Filters = {
    category: category && isValidCategory(category) ? category : undefined,
    location: location ?? undefined,
    minPrice: minPrice ? parseInt(minPrice, 10) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
    status: status && isValidStatus(status) ? status : undefined,
    sort: sort && isValidSort(sort) ? sort : 'newest',
  };

  const listings = filterListings(filters);
  const hasFilters = !!(category || location || minPrice || maxPrice);

  return (
    <>
      <Suspense fallback={<div className="h-16 bg-white border-b border-wankin-gray-200" />}>
        <ListingFilters />
      </Suspense>

      <div className="bg-wankin-cream min-h-[60vh] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-sm text-wankin-gray-700" aria-live="polite">
              Showing{' '}
              <span className="font-semibold text-wankin-ink">{listings.length}</span>{' '}
              {listings.length === 1 ? 'plot' : 'plots'} in Kenya
              {hasFilters && ' (filtered)'}
            </p>
          </div>

          {listings.length === 0 ? (
            <EmptyState />
          ) : (
            <div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Property listings"
            >
              {listings.map((listing, i) => (
                <ListingCard key={listing.slug} listing={listing} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-wankin-gray-200"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-10 w-10 text-wankin-gray-700"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-wankin-ink">
          No plots match those filters
        </h2>
        <p className="mt-2 text-sm text-wankin-gray-700">
          Try widening your search or clearing the filters.
        </p>
      </div>
      <a
        href="/properties"
        className="text-sm font-semibold text-wankin-blue hover:text-wankin-blue-dark underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue rounded"
      >
        Clear all filters
      </a>
    </div>
  );
}
