import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'James Mwangi',
    location: 'Nairobi',
    quote:
      'I bought a plot in Juja Farm Mwireri last year. The title deed was ready in two weeks. I have seen other agents take 6 months. Wankin was different.',
    plot: 'Juja Farm Mwireri',
  },
  {
    name: 'Grace Wanjiku',
    location: 'Diaspora, UK',
    quote:
      'I did a virtual site visit via video call. The team was honest about what I was buying. The transfer happened while I was still in London. Very smooth.',
    plot: 'Gongoni Malindi',
  },
  {
    name: 'Peter Kamau',
    location: 'Thika',
    quote:
      'The payment plan worked for me. Paid deposit in January, finished paying in July, got my title. My family is building now. Cannot complain at all.',
    plot: 'Mwalimu Farm',
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-wankin-cream py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2
            id="testimonials-heading"
            className="font-display text-3xl font-extrabold text-wankin-ink sm:text-4xl"
          >
            What our buyers say
          </h2>
          <p className="mt-4 text-base text-wankin-gray-700">
            Real stories from people who own land through Wankin Properties.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          role="list"
          aria-label="Customer testimonials"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl bg-white p-6 shadow-card"
              role="listitem"
            >
              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote>
                <p className="text-sm text-wankin-gray-700 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-wankin-blue text-white font-display font-bold text-sm"
                  aria-hidden="true"
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-wankin-ink">{t.name}</p>
                  <p className="text-xs text-wankin-gray-700">
                    {t.location} &middot; {t.plot}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
