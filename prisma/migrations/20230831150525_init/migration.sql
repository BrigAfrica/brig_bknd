-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'failed', 'completed');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'failed', 'completed');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('pick_up', 'delivery');

-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'PENDING');

-- CreateTable
CREATE TABLE "brig_newsletter" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "brig_newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repairs" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "dateAvailable" TEXT NOT NULL,
    "timeAvailable" TEXT NOT NULL,
    "fileSource" TEXT NOT NULL,
    "fileUrl" TEXT,
    "updates" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "repairs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "UserRole"[] DEFAULT ARRAY['user']::"UserRole"[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,
    "memory" TEXT,
    "storage" TEXT,
    "image1" TEXT,
    "image2" TEXT,
    "image3" TEXT,
    "boxImage" TEXT,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "address" TEXT NOT NULL,
    "phone_number" TEXT,
    "userId" INTEGER NOT NULL,
    "type" "OrderType" NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "trackingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" VARCHAR(22),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsOnOrder" (
    "productId" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductsOnOrder_pkey" PRIMARY KEY ("productId","orderId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "status" "PaymentStatus" NOT NULL,
    "referenceId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" SERIAL NOT NULL,
    "discountPercentage" INTEGER NOT NULL,
    "originalPrice" DOUBLE PRECISION NOT NULL,
    "discountedPrice" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "availableQuantity" INTEGER NOT NULL,
    "status" "DealStatus" NOT NULL,
    "priority" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brig_newsletter_email_key" ON "brig_newsletter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "repairs_email_key" ON "repairs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnOrder" ADD CONSTRAINT "ProductsOnOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnOrder" ADD CONSTRAINT "ProductsOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
