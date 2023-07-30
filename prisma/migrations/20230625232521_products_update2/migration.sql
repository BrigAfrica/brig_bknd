/*
  Warnings:

  - Added the required column `boxImage` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "boxImage" TEXT NOT NULL;
