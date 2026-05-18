'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div>
        <p className="font-display text-5xl font-extrabold text-wankin-red">Oops</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-wankin-ink">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-wankin-gray-700">
          {error.message ?? 'An unexpected error occurred.'}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} size="lg">
          Try again
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="/">Back to home</a>
        </Button>
      </div>
    </main>
  );
}
