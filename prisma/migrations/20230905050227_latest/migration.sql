/*
  Warnings:

  - You are about to drop the column `productId` on the `Deal` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deal" DROP CONSTRAINT "Deal_productId_fkey";

-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "productId",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
