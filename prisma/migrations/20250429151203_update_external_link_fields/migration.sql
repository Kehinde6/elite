/*
  Warnings:

  - You are about to drop the column `siteName` on the `ExternalLink` table. All the data in the column will be lost.
  - Added the required column `retailer` to the `ExternalLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExternalLink" DROP COLUMN "siteName",
ADD COLUMN     "retailer" TEXT NOT NULL;
