import { z } from 'zod';

export const inquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Please enter your full name')
    .max(100, 'Name is too long'),
  phone: z
    .string()
    .min(9, 'Please enter a valid phone number')
    .max(15, 'Phone number is too long')
    .regex(/^[\+\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  preferredDate: z.string().optional(),
  message: z
    .string()
    .min(10, 'Please write at least a short message')
    .max(1000, 'Message is too long'),
  listingSlug: z.string().optional(),
  reason: z
    .enum(['general', 'site-visit', 'sell-property', 'partnership'])
    .optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export const searchSchema = z.object({
  category: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(['buy', 'reserve']).optional(),
});

export type SearchFormData = z.infer<typeof searchSchema>;
