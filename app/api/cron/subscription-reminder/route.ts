import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { addDays, format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  try {
    // Get tomorrow's date
    const tomorrow = addDays(new Date(), 1);
    const tomorrowFormatted = format(tomorrow, 'yyyy-MM-dd');

    // Find all members whose subscription is expiring tomorrow
    const expiringMembers = await prisma.member.findMany({
      where: {
        endDate: {
          gte: new Date(tomorrowFormatted),
          lt: addDays(new Date(tomorrowFormatted), 1),
        },
        subscriptionStatus: 'active', // Only send reminders for active subscriptions
      },
      include: {
        business: true, // Include business details
        subscriptionPlan: true, // Include subscription plan details
      },
    });

    const results = [];

    // Send reminder emails for each expiring member
    for (const member of expiringMembers) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Subminder <noreply@kshetritej.com.np>',
          to: member.email,
          subject: 'Your Subscription is Expiring Tomorrow',
          react: EmailTemplate({
            email: member.email,
            subject: 'Subscription Expiring Tomorrow',
            message: `Dear ${member.fullName},

This is a friendly reminder that your subscription at ${member.business.name} will expire tomorrow (${format(member.endDate, 'MMMM dd, yyyy')}).

Your current plan: ${member.subscriptionPlan.planName}
Price: $${member.subscriptionPlan.price}

To ensure uninterrupted service, please renew your subscription before it expires.

If you have any questions or need assistance, please don't hesitate to contact us.

Best regards,
${member.business.name} Team`
          }) as React.ReactElement,
        });

        if (error) {
          results.push({
            memberId: member.id,
            email: member.email,
            status: 'error',
            error: error.message,
          });
        } else {
          results.push({
            memberId: member.id,
            email: member.email,
            status: 'success',
          });
        }
      } catch (error) {
        results.push({
          memberId: member.id,
          email: member.email,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      message: 'Subscription reminder check completed',
      results,
    });
  } catch (error) {
    console.error('Error in subscription reminder cron:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 