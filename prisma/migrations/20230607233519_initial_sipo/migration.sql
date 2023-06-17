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

-- CreateIndex
CREATE UNIQUE INDEX "repairs_email_key" ON "repairs"("email");
