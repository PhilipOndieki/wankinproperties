import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div>
        <p className="font-display text-7xl font-extrabold text-wankin-blue">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-wankin-ink">
          Page not found
        </h1>
        <p className="mt-2 text-wankin-gray-700">
          This page does not exist. Let us take you back to the listings.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/properties">Browse all plots</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
