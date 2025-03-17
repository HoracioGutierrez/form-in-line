-- AlterTable
ALTER TABLE "queue_members" ADD COLUMN     "has_spoken" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "queue_ended" BOOLEAN NOT NULL DEFAULT false;
