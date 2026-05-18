'use client';

import React, { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LOCATION_LABELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

const PRICE_STEPS = [
  { value: '0', label: 'No minimum' },
  { value: '500000', label: formatPrice(500000) },
  { value: '750000', label: formatPrice(750000) },
  { value: '1000000', label: formatPrice(1000000) },
  { value: '1500000', label: formatPrice(1500000) },
];

const MAX_PRICE_STEPS = [
  { value: '0', label: 'No maximum' },
  { value: '750000', label: formatPrice(750000) },
  { value: '1000000', label: formatPrice(1000000) },
  { value: '1500000', label: formatPrice(1500000) },
  { value: '2000000', label: formatPrice(2000000) },
];

export function ListingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') ?? '';
  const location = searchParams.get('location') ?? '';
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';
  const sort = searchParams.get('sort') ?? 'newest';

  const hasActiveFilters = !!(category || location || minPrice || maxPrice || sort !== 'newest');

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/properties?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const clearFilters = () => {
    router.push('/properties', { scroll: false });
  };

  return (
    <div className="sticky top-16 z-30 w-full border-b border-wankin-gray-200 bg-white py-3 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3" role="search" aria-label="Filter properties">
          <div className="flex items-center gap-1.5 text-sm font-medium text-wankin-gray-700">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Filter</span>
          </div>

          <Select value={category} onValueChange={(v) => updateParam('category', v === 'all' ? '' : v)}>
            <SelectTrigger className="h-9 w-auto min-w-[160px] text-xs" aria-label="Filter by category">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {Object.entries(LOCATION_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={minPrice} onValueChange={(v) => updateParam('minPrice', v === '0' ? '' : v)}>
            <SelectTrigger className="h-9 w-auto min-w-[140px] text-xs" aria-label="Minimum price">
              <SelectValue placeholder="Min price" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_STEPS.map((step) => (
                <SelectItem key={step.value} value={step.value}>
                  {step.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={maxPrice} onValueChange={(v) => updateParam('maxPrice', v === '0' ? '' : v)}>
            <SelectTrigger className="h-9 w-auto min-w-[140px] text-xs" aria-label="Maximum price">
              <SelectValue placeholder="Max price" />
            </SelectTrigger>
            <SelectContent>
              {MAX_PRICE_STEPS.map((step) => (
                <SelectItem key={step.value} value={step.value}>
                  {step.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Juja, Malindi, Makuyu..."
            value={location}
            onChange={(e) => updateParam('location', e.target.value)}
            className="h-9 w-auto min-w-[180px] text-xs"
            aria-label="Filter by location"
          />

          <Select value={sort} onValueChange={(v) => updateParam('sort', v)}>
            <SelectTrigger className="h-9 w-auto min-w-[160px] text-xs" aria-label="Sort listings">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-9 gap-1.5 text-xs text-wankin-gray-700"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
