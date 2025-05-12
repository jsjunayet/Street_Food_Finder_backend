-- CreateEnum
CREATE TYPE "approveStatus" AS ENUM ('approved', 'rejected', 'pending');

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "status" "approveStatus" NOT NULL DEFAULT 'approved';
