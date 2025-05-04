/*
  Warnings:

  - Added the required column `password` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_email_key" ON "SuperAdmin"("email");
