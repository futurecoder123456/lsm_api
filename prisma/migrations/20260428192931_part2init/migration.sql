/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_customer_id_fkey";

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "customer_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "customer_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "date_joined" TIMESTAMP(3) NOT NULL,
    "user_dob" TIMESTAMP(3) NOT NULL,
    "fees_paid" DOUBLE PRECISION NOT NULL,
    "books_loaned" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
