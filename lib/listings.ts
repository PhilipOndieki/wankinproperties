import listingsData from '@/data/listings.json';
import type { Listing, ListingFilters, LocationCategory, PropertyStatus } from '@/types/listing';

const allListings: Listing[] = listingsData as Listing[];

export function getListings(): Listing[] {
  return allListings.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getListingBySlug(slug: string): Listing | undefined {
  return allListings.find((l) => l.slug === slug);
}

export function getFeaturedListings(): Listing[] {
  return allListings.filter((l) => l.isFeatured && l.status !== 'sold-out');
}

export function getListingsByCategory(category: LocationCategory): Listing[] {
  return allListings.filter((l) => l.category === category);
}

export function filterListings(filters: ListingFilters): Listing[] {
  let results = [...allListings];

  if (filters.category) {
    results = results.filter((l) => l.category === filters.category);
  }

  if (filters.location) {
    const query = filters.location.toLowerCase();
    results = results.filter(
      (l) =>
        l.location.toLowerCase().includes(query) ||
        l.title.toLowerCase().includes(query),
    );
  }

  if (filters.minPrice !== undefined) {
    results = results.filter((l) => l.price >= (filters.minPrice ?? 0));
  }

  if (filters.maxPrice !== undefined) {
    results = results.filter((l) => l.price <= (filters.maxPrice ?? Infinity));
  }

  if (filters.status) {
    results = results.filter((l) => l.status === filters.status);
  }

  switch (filters.sort) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      results.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  return results;
}

export function getCoastalListings(): Listing[] {
  return allListings.filter((l) => l.category === 'gongoni-malindi');
}

export function getFeaturedDeals(): Listing[] {
  return allListings.filter((l) => l.status === 'selling-fast');
}

export function getAllSlugs(): string[] {
  return allListings.map((l) => l.slug);
}

export function getLocationCategories(): LocationCategory[] {
  const categories = new Set(allListings.map((l) => l.category));
  return Array.from(categories) as LocationCategory[];
}

export function isValidCategory(value: string): value is LocationCategory {
  const valid: LocationCategory[] = [
    'juja-farm',
    'juja-farm-athi',
    'mwalimu-farm',
    'makuyu-mananja',
    'gongoni-malindi',
  ];
  return valid.includes(value as LocationCategory);
}

export function isValidStatus(value: string): value is PropertyStatus {
  const valid: PropertyStatus[] = ['available', 'selling-fast', 'sold-out'];
  return valid.includes(value as PropertyStatus);
}

export function isValidSort(
  value: string,
): value is NonNullable<ListingFilters['sort']> {
  return ['newest', 'price-asc', 'price-desc'].includes(value);
}
