import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';

export function CtaBanner() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-wankin-blue-dark py-16 sm:py-20"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="cta-heading"
          className="font-display text-3xl font-extrabold text-white sm:text-4xl"
        >
          Ready to own land in Kenya?
        </h2>
        <p className="mt-4 text-lg text-blue-200">
          Talk to our team today. We respond within minutes on WhatsApp.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            variant="white"
            size="xl"
            className="w-full sm:w-auto gap-2"
          >
            <a href="tel:+254758300900" aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}>
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {CONTACT_PHONE_DISPLAY}
            </a>
          </Button>
          <Button
            asChild
            variant="whatsapp"
            size="xl"
            className="w-full sm:w-auto gap-2"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Wankin Properties on WhatsApp"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
