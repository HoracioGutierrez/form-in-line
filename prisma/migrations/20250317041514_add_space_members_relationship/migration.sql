/*
  Warnings:

  - Added the required column `space_id` to the `queue_members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "queue_members" ADD COLUMN     "space_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "queue_members" ADD CONSTRAINT "queue_members_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
