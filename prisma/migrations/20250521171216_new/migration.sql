/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDate` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionPlanId` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `notificationSettings` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Business` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_subscriptionPlanId_fkey";

-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "createdAt",
DROP COLUMN "paymentDate",
DROP COLUMN "paymentMethod",
DROP COLUMN "paymentStatus",
DROP COLUMN "subscriptionPlanId",
DROP COLUMN "transactionId",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "notificationSettings",
DROP COLUMN "preferences",
DROP COLUMN "updatedAt",
DROP COLUMN "website";
