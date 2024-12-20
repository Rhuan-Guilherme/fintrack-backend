-- CreateEnum
CREATE TYPE "TypeTransaction" AS ENUM ('INCOME', 'OUTCOME');

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" "TypeTransaction" NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
