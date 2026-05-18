'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const tabs = ['Property Search', 'Site Visits'] as const;
type Tab = (typeof tabs)[number];

const categories = [
  { value: 'all', label: 'All plot types' },
  { value: 'juja-farm', label: 'Residential Plot' },
  { value: 'gongoni-malindi', label: 'Coastal Plot' },
  { value: 'makuyu-mananja', label: 'Farm Plot' },
];

export function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('Property Search');
  const [buyMode, setBuyMode] = useState<'buy' | 'reserve'>('buy');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (location) params.set('location', location);
    router.push(`/properties?${params.toString()}`);
  };

  const handleSiteVisit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/contact?reason=site-visit');
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="flex border-b border-wankin-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-selected={activeTab === tab}
              role="tab"
              className={cn(
                'flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-wankin-blue',
                activeTab === tab
                  ? 'border-wankin-red text-wankin-red'
                  : 'border-transparent text-wankin-gray-700 hover:text-wankin-ink',
              )}
            >
              {tab === 'Site Visits' && <Calendar className="h-4 w-4" aria-hidden="true" />}
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Property Search' ? (
          <form onSubmit={handleSearch} role="search" aria-label="Search properties">
            <div className="flex flex-wrap items-center gap-3 p-4 sm:flex-nowrap">
              <div className="flex rounded-lg border border-wankin-gray-200 p-0.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setBuyMode('buy')}
                  aria-pressed={buyMode === 'buy'}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    buyMode === 'buy'
                      ? 'bg-wankin-blue text-white'
                      : 'text-wankin-gray-700 hover:text-wankin-ink',
                  )}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setBuyMode('reserve')}
                  aria-pressed={buyMode === 'reserve'}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    buyMode === 'reserve'
                      ? 'bg-wankin-blue text-white'
                      : 'text-wankin-gray-700 hover:text-wankin-ink',
                  )}
                >
                  Reserve
                </button>
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="min-w-[160px]" aria-label="Select plot type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Juja, Malindi, Makuyu..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 min-w-[160px]"
                aria-label="Enter location"
              />

              <Button type="submit" size="lg" className="shrink-0 gap-2">
                <Search className="h-4 w-4" aria-hidden="true" />
                Search
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSiteVisit} className="p-4" aria-label="Book a site visit">
            <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
              <Input
                placeholder="Which area? Juja, Malindi, Makuyu..."
                className="flex-1"
                aria-label="Enter area for site visit"
              />
              <Button type="submit" size="lg" className="shrink-0 gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Book visit
              </Button>
            </div>
            <p className="mt-3 text-xs text-wankin-gray-700">
              Site visits are free. We run them every Saturday. Our team picks you up if needed.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
