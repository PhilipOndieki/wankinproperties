import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, Mail, MessageCircle, MapPin, Check, ChevronRight } from 'lucide-react';
import { getListingBySlug, getAllSlugs } from '@/lib/listings';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ListingGallery } from '@/components/listings/listing-gallery';
import { InquiryForm } from '@/components/listings/inquiry-form';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  SITE_NAME,
  WHATSAPP_URL,
} from '@/lib/constants';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const listing = getListingBySlug(params.slug);
  if (!listing) return {};

  const firstImage = listing.images[0];

  return {
    title: listing.title,
    description: listing.shortDescription,
    keywords: [
      listing.title,
      listing.location,
      'plots for sale Kenya',
      'title deed ready',
      `buy land ${listing.location}`,
    ],
    openGraph: {
      title: `${listing.title} | ${SITE_NAME}`,
      description: listing.shortDescription,
      images: firstImage
        ? [{ url: firstImage.src, alt: firstImage.alt }]
        : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.title} | ${SITE_NAME}`,
      description: listing.shortDescription,
      images: firstImage ? [firstImage.src] : [],
    },
  };
}

export default function ListingPage({ params }: PageProps) {
  const listing = getListingBySlug(params.slug);
  if (!listing) notFound();

  const whatsappMsg = encodeURIComponent(
    `Hi Wankin Properties, I am interested in ${listing.title} at ${formatPrice(listing.price)}. Please send me more details.`,
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.shortDescription,
    url: `https://wankinproperties.co.ke/properties/${listing.slug}`,
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'KES',
      availability:
        listing.status === 'sold-out'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.location,
      addressCountry: 'KE',
    },
    ...(listing.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: listing.coordinates.lat,
        longitude: listing.coordinates.lng,
      },
    }),
    image: listing.images.map((img) => img.src),
    seller: {
      '@type': 'RealEstateAgent',
      name: SITE_NAME,
      telephone: CONTACT_PHONE_DISPLAY,
    },
  };

  const statusVariant = {
    available: 'available',
    'selling-fast': 'selling-fast',
    'sold-out': 'sold-out',
  } as const;

  const statusLabel = {
    available: 'Available',
    'selling-fast': 'Selling Fast',
    'sold-out': 'Sold Out',
  };

  const paragraphs = listing.longDescription.split('\n\n').filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-wankin-cream min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-wankin-gray-700" role="list">
              <li>
                <Link
                  href="/"
                  className="hover:text-wankin-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue rounded"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>
                <Link
                  href="/properties"
                  className="hover:text-wankin-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue rounded"
                >
                  Properties
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li aria-current="page" className="text-wankin-ink font-medium truncate max-w-[160px] sm:max-w-none">
                {listing.title}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-8">
              <ListingGallery images={listing.images} title={listing.title} />

              <div className="rounded-2xl bg-white p-6 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge variant={statusVariant[listing.status]}>
                        {statusLabel[listing.status]}
                      </Badge>
                      <Badge variant="outline">{listing.plotSize} ft</Badge>
                    </div>
                    <h1 className="font-display text-3xl font-extrabold text-wankin-ink">
                      {listing.title}
                    </h1>
                    <div className="mt-2 flex items-center gap-1.5 text-wankin-gray-700">
                      <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="text-sm">{listing.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium uppercase tracking-wider text-wankin-gray-700">
                      Cash price
                    </p>
                    <p
                      className="font-display text-4xl font-extrabold text-wankin-red"
                      aria-label={`Price: ${formatPrice(listing.price)}`}
                    >
                      {formatPrice(listing.price)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-card">
                <h2 className="font-display text-xl font-bold text-wankin-ink mb-4">
                  About this plot
                </h2>
                <div className="space-y-4">
                  {paragraphs.map((para, i) => (
                    <p key={i} className="text-sm text-wankin-gray-700 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-card">
                <h2 className="font-display text-xl font-bold text-wankin-ink mb-4">
                  Plot features
                </h2>
                <ul
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                  role="list"
                  aria-label="Plot features"
                >
                  {listing.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className="h-4 w-4 shrink-0 mt-0.5 text-wankin-green"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-wankin-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {listing.coordinates && (
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <h2 className="font-display text-xl font-bold text-wankin-ink mb-4">
                    Location
                  </h2>
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-wankin-gray-200">
                    <iframe
                      title={`Map showing location of ${listing.title}`}
                      src={`https://maps.google.com/maps?q=${listing.coordinates.lat},${listing.coordinates.lng}&z=14&output=embed`}
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <p className="mt-2 text-xs text-wankin-gray-700">
                    {listing.location}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-wankin-gray-200">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-wankin-blue">
                      <span className="font-display font-bold text-white text-sm">W</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-wankin-ink">Wankin Properties</p>
                      <p className="text-xs text-wankin-gray-700">Licensed real estate agent</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <a
                      href="tel:+254758300900"
                      className="flex items-center gap-3 rounded-lg border border-wankin-gray-200 px-4 py-3 text-sm font-medium text-wankin-blue hover:bg-wankin-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue"
                      aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}
                    >
                      <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {CONTACT_PHONE_DISPLAY}
                    </a>
                    <a
                      href={`https://wa.me/254758300900?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-medium text-white hover:bg-[#1da851] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                      aria-label="Chat about this listing on WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Chat on WhatsApp
                    </a>
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=Inquiry: ${listing.title}`}
                      className="flex items-center gap-3 rounded-lg border border-wankin-gray-200 px-4 py-3 text-sm font-medium text-wankin-gray-700 hover:bg-wankin-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wankin-blue"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Email us
                    </a>
                  </div>

                  <div className="border-t border-wankin-gray-200 pt-4">
                    <h2 className="text-sm font-semibold text-wankin-ink mb-4">
                      Send an inquiry
                    </h2>
                    <InquiryForm
                      listingSlug={listing.slug}
                      listingTitle={listing.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
