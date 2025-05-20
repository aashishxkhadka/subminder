import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import * as React from 'react';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, subject, message } = body;

  if (!email || !subject || !message) {
    return Response.json(
      { error: 'Email, subject, and message are required' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Subminder <noreply@kshetritej.com.np>',
      to: email,
      subject: subject,
      react: EmailTemplate({ 
        email, 
        subject, 
        message 
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}