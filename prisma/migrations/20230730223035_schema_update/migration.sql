/*
  Warnings:

  - You are about to drop the column `tracking_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `reference_id` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `referenceId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "tracking_id",
ADD COLUMN     "trackingId" TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "reference_id",
ADD COLUMN     "referenceId" TEXT NOT NULL;
