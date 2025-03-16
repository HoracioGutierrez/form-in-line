/*
  Warnings:

  - Added the required column `slug` to the `spaces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "spaces" ADD COLUMN     "slug" TEXT NOT NULL;
