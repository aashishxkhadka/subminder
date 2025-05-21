/*
  Warnings:

  - Added the required column `subscriptionPlanId` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billing" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentDate" TIMESTAMP(3),
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentStatus" TEXT,
ADD COLUMN     "subscriptionPlanId" TEXT NOT NULL,
ADD COLUMN     "transactionId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "paymentLink" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "notificationSettings" JSONB DEFAULT '{"emailNotifications":true,"smsNotifications":false,"subscriptionAlerts":true,"paymentReminders":true,"marketingEmails":false}',
ADD COLUMN     "preferences" JSONB DEFAULT '{"language":"en","timezone":"UTC","dateFormat":"MM/DD/YYYY","currency":"USD","theme":"light"}',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "website" TEXT;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
