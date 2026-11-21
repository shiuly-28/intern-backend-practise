-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('PENDING', 'CANCEL', 'CONFRIM');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
