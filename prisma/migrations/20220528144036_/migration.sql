/*
  Warnings:

  - Made the column `masterId` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TypeGame" AS ENUM ('FANTASIA');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "type" "TypeGame" NOT NULL DEFAULT E'FANTASIA',
ALTER COLUMN "masterId" SET NOT NULL;
