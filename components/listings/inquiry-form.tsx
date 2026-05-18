'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { inquirySchema, type InquiryFormData } from '@/lib/validations';
import { cn } from '@/lib/utils';

interface InquiryFormProps {
  listingSlug?: string;
  listingTitle?: string;
  showReason?: boolean;
}

export function InquiryForm({ listingSlug, listingTitle, showReason = false }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      listingSlug,
      message: listingTitle
        ? `I am interested in ${listingTitle}. Please send me more details.`
        : '',
    },
  });

  const reason = watch('reason');

  const onSubmit = async (data: InquiryFormData) => {
    setServerError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError((body as { error?: string }).error ?? 'Something went wrong. Please call us directly.');
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError('Could not connect. Please call us directly at +254 758 300 900.');
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-wankin-green" aria-hidden="true" />
        <h3 className="font-display text-lg font-bold text-wankin-ink">Message received.</h3>
        <p className="text-sm text-wankin-gray-700">
          Our team will call or WhatsApp you within minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="inquiry-name">Full name</Label>
        <Input
          id="inquiry-name"
          placeholder="Your name"
          autoComplete="name"
          aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <p id="inquiry-name-error" className="text-xs text-wankin-red" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="inquiry-phone">Phone number</Label>
        <Input
          id="inquiry-phone"
          type="tel"
          placeholder="+254 7XX XXX XXX"
          autoComplete="tel"
          aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
          aria-invalid={!!errors.phone}
          {...register('phone')}
        />
        {errors.phone && (
          <p id="inquiry-phone-error" className="text-xs text-wankin-red" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="inquiry-email">
          Email <span className="text-wankin-gray-700 font-normal">(optional)</span>
        </Label>
        <Input
          id="inquiry-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p id="inquiry-email-error" className="text-xs text-wankin-red" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="inquiry-date">
          Preferred site visit date <span className="text-wankin-gray-700 font-normal">(optional)</span>
        </Label>
        <Input
          id="inquiry-date"
          type="date"
          aria-describedby={errors.preferredDate ? 'inquiry-date-error' : undefined}
          {...register('preferredDate')}
        />
      </div>

      {showReason && (
        <div className="space-y-1.5">
          <Label htmlFor="inquiry-reason">Reason for contact</Label>
          <Select
            value={reason}
            onValueChange={(v) =>
              setValue('reason', v as InquiryFormData['reason'])
            }
          >
            <SelectTrigger id="inquiry-reason" aria-label="Select reason for contact">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General inquiry</SelectItem>
              <SelectItem value="site-visit">Schedule a site visit</SelectItem>
              <SelectItem value="sell-property">Sell my property</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="inquiry-message">Message</Label>
        <Textarea
          id="inquiry-message"
          rows={4}
          placeholder="Tell us what you're looking for..."
          aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && (
          <p id="inquiry-message-error" className="text-xs text-wankin-red" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-wankin-red bg-red-50 rounded-lg px-3 py-2" role="alert">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
        aria-label="Send inquiry"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          'Send inquiry'
        )}
      </Button>

      <p className="text-center text-xs text-wankin-gray-700">
        We respond within minutes on WhatsApp.
      </p>
    </form>
  );
}
