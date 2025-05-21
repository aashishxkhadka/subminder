/*
  Warnings:

  - You are about to drop the column `memberId` on the `Billing` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_memberId_fkey";

-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "memberId",
ADD COLUMN     "member" TEXT;
