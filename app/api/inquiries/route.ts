import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  let data;
  try {
    data = inquirySchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', issues: err.issues },
        { status: 422 },
      );
    }
    throw err;
  }

  console.log('[Inquiry received]', {
    timestamp: new Date().toISOString(),
    name: data.name,
    phone: data.phone,
    email: data.email ?? null,
    listingSlug: data.listingSlug ?? null,
    reason: data.reason ?? null,
    preferredDate: data.preferredDate ?? null,
    message: data.message,
  });

  // SMTP stub — replace with nodemailer or Resend when SMTP vars are set
  const smtpHost = process.env.SMTP_HOST;
  if (smtpHost) {
    try {
      // nodemailer integration goes here
      // const transporter = nodemailer.createTransport({ ... });
      // await transporter.sendMail({ ... });
    } catch (emailErr) {
      console.error('[Inquiry email failed]', emailErr);
    }
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
