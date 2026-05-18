export type LocationCategory =
  | 'juja-farm'
  | 'juja-farm-athi'
  | 'mwalimu-farm'
  | 'makuyu-mananja'
  | 'gongoni-malindi';

export type PropertyStatus = 'available' | 'selling-fast' | 'sold-out';

export interface ListingImage {
  src: string;
  alt: string;
}

export interface ListingCoordinates {
  lat: number;
  lng: number;
}

export interface Listing {
  slug: string;
  title: string;
  location: string;
  category: LocationCategory;
  plotSize: string;
  price: number;
  status: PropertyStatus;
  shortDescription: string;
  longDescription: string;
  features: string[];
  images: ListingImage[];
  coordinates?: ListingCoordinates;
  isFeatured: boolean;
  createdAt: string;
}

export interface ListingFilters {
  category?: LocationCategory;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  status?: PropertyStatus;
  sort?: 'newest' | 'price-asc' | 'price-desc';
}
