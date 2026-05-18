import React from 'react';
import { Shield, MapPin, Wallet, Eye } from 'lucide-react';

const signals = [
  {
    icon: Shield,
    heading: 'Ready Title Deeds',
    body: 'Every plot we sell comes with a clean, transferable title deed. No waiting, no middlemen.',
  },
  {
    icon: MapPin,
    heading: 'Prime Locations',
    body: 'Juja, Makuyu, Ruai, and the Malindi coast. Growing areas with real infrastructure.',
  },
  {
    icon: Wallet,
    heading: 'Flexible Payment Plans',
    body: 'Pay 30% down and settle the balance over 6 months. We work with your budget.',
  },
  {
    icon: Eye,
    heading: 'Free Site Visits',
    body: 'We run site visits every Saturday. See the land before you commit. No obligation.',
  },
];

export function WhyWankin() {
  return (
    <section
      aria-labelledby="why-wankin-heading"
      className="bg-wankin-cream py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2
            id="why-wankin-heading"
            className="font-display text-3xl font-extrabold text-wankin-ink sm:text-4xl"
          >
            Why buy with Wankin Properties?
          </h2>
          <p className="mt-4 text-base text-wankin-gray-700">
            We have one job. Get you into land with a clean title, at a fair price, with zero stress.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Trust signals"
        >
          {signals.map(({ icon: Icon, heading, body }) => (
            <div
              key={heading}
              className="flex flex-col items-center text-center gap-4"
              role="listitem"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full bg-wankin-blue/10"
                aria-hidden="true"
              >
                <Icon className="h-7 w-7 text-wankin-blue" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-wankin-ink">
                  {heading}
                </h3>
                <p className="mt-2 text-sm text-wankin-gray-700 leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
