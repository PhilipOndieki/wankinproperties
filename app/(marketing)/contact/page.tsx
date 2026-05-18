import React from 'react';
import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { InquiryForm } from '@/components/listings/inquiry-form';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  OFFICE_ADDRESS,
  OFFICE_HOURS,
  WHATSAPP_URL,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Wankin Properties. Call, WhatsApp, or visit our office in Juja, Kiambu County.',
};

export default function ContactPage() {
  return (
    <div className="bg-wankin-cream min-h-screen">
      <div className="bg-wankin-blue-dark py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-blue-200">
            We respond within minutes on WhatsApp. Call anytime during business hours.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-wankin-ink mb-6">
                Contact details
              </h2>
              <address className="not-italic space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wankin-blue/10"
                    aria-hidden="true"
                  >
                    <Phone className="h-5 w-5 text-wankin-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-wankin-ink">Phone</p>
                    <a
                      href="tel:+254758300900"
                      className="text-sm text-wankin-blue hover:underline"
                      aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}
                    >
                      {CONTACT_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10"
                    aria-hidden="true"
                  >
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-wankin-ink">WhatsApp</p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#25D366] hover:underline"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wankin-blue/10"
                    aria-hidden="true"
                  >
                    <Mail className="h-5 w-5 text-wankin-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-wankin-ink">Email</p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-sm text-wankin-blue hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wankin-blue/10"
                    aria-hidden="true"
                  >
                    <MapPin className="h-5 w-5 text-wankin-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-wankin-ink">Office</p>
                    <p className="text-sm text-wankin-gray-700">{OFFICE_ADDRESS}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wankin-blue/10"
                    aria-hidden="true"
                  >
                    <Clock className="h-5 w-5 text-wankin-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-wankin-ink">Hours</p>
                    <p className="text-sm text-wankin-gray-700">{OFFICE_HOURS}</p>
                  </div>
                </div>
              </address>
            </div>

            <div className="rounded-2xl overflow-hidden bg-wankin-gray-200 aspect-video">
              <iframe
                title="Wankin Properties office location map"
                src="https://maps.google.com/maps?q=-1.0974,37.0144&z=15&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-card">
            <h2 className="font-display text-2xl font-bold text-wankin-ink mb-2">
              Send a message
            </h2>
            <p className="text-sm text-wankin-gray-700 mb-6">
              Fill in the form and our team will respond within minutes.
            </p>
            <InquiryForm showReason />
          </div>
        </div>
      </div>
    </div>
  );
}
