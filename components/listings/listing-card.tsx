import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import type { Listing } from '@/types/listing';
import { Badge } from '@/components/ui/badge';
import { formatPrice, truncate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
  priority?: boolean;
  className?: string;
}

const statusVariant = {
  available: 'available',
  'selling-fast': 'selling-fast',
  'sold-out': 'sold-out',
} as const;

const statusLabel = {
  available: 'Available',
  'selling-fast': 'Selling Fast',
  'sold-out': 'Sold Out',
} as const;

export function ListingCard({ listing, priority = false, className }: ListingCardProps) {
  const firstImage = listing.images[0];

  return (
    <Link
      href={`/properties/${listing.slug}`}
      className={cn(
        'group block rounded-xl bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue focus-visible:ring-offset-2',
        className,
      )}
      aria-label={`View ${listing.title} in ${listing.location}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-wankin-cream">
        {firstImage && (
          <Image
            src={firstImage.src}
            alt={firstImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
        )}
        <div className="absolute inset-0 flex items-start justify-between p-3 pointer-events-none">
          <Badge variant="secondary" className="shadow-sm">
            {listing.plotSize} ft
          </Badge>
          <Badge variant={statusVariant[listing.status]} className="shadow-sm">
            {statusLabel[listing.status]}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <p
          className="text-xl font-bold text-wankin-red font-display"
          aria-label={`Price: ${formatPrice(listing.price)}`}
        >
          {formatPrice(listing.price)}
        </p>
        <h3 className="mt-1 text-base font-semibold text-wankin-ink leading-snug">
          {listing.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1 text-wankin-gray-700">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="text-xs">{listing.location}</span>
        </div>
        <p className="mt-2 text-xs text-wankin-gray-700 leading-relaxed">
          {truncate(listing.shortDescription, 80)}
        </p>
      </div>
    </Link>
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="rounded-xl bg-white overflow-hidden shadow-card animate-pulse">
      <div className="aspect-[16/10] bg-wankin-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-6 w-32 bg-wankin-gray-200 rounded" />
        <div className="h-4 w-48 bg-wankin-gray-200 rounded" />
        <div className="h-3 w-24 bg-wankin-gray-200 rounded" />
        <div className="h-3 w-full bg-wankin-gray-200 rounded" />
      </div>
    </div>
  );
}
