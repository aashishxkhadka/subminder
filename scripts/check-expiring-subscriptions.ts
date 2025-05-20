import { Resend } from 'resend';
import prisma from '../lib/prisma.js';
import { addDays, format } from 'date-fns';
import { generateEmailContent } from './email-template.js';
import { auth } from '@/auth.js';

const resend = new Resend("re_aXRJ7i3X_LRrLsHRQAexAmyWX3HhdLJ57");

export async function checkExpiringSubscriptions() {

  try {
    console.log('Checking for expiring subscriptions...');
    
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

    console.log(`Found ${expiringMembers.length} members with expiring subscriptions`);

    const results = [];

    // Send reminder emails for each expiring member
    for (const member of expiringMembers) {
      try {
        console.log(`Sending reminder to ${member.email}...`);
        
        const message = `Dear ${member.fullName},

This is a friendly reminder that your subscription at Subminder will expire tomorrow (${format(member.endDate, 'MMMM dd, yyyy')}).

Your current plan: ${member.subscriptionPlan.planName}
Price: $${member.subscriptionPlan.price}

To ensure uninterrupted service, please renew your subscription before it expires.

If you have any questions or need assistance, please don't hesitate to contact us.`;

        const { data, error } = await resend.emails.send({
          from: `Subminder <noreply@kshetritej.com.np>`,
          to: member.email,
          subject: 'Your Subscription is Expiring Tomorrow',
          html: generateEmailContent({
          
            email: member.email,
            subject: 'Subscription Expiring Tomorrow',
            message: message
          })
        });

        if (error) {
          console.error(`Error sending email to ${member.email}:`, error);
          results.push({
            memberId: member.id,
            email: member.email,
            status: 'error',
            error: error.message,
          });
        } else {
          console.log(`Successfully sent reminder to ${member.email}`);
          results.push({
            memberId: member.id,
            email: member.email,
            status: 'success',
          });
        }
      } catch (error) {
        console.error(`Error processing member ${member.id}:`, error);
        results.push({
          memberId: member.id,
          email: member.email,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    console.log('Subscription reminder check completed');
    console.log('Results:', results);
    
    // Close the Prisma connection
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error in subscription reminder check:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Run the function
checkExpiringSubscriptions(); 