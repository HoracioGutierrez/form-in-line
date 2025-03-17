-- CreateTable
CREATE TABLE "queues" (
    "id" SERIAL NOT NULL,
    "space_id" INTEGER NOT NULL,
    "start_at_day" TEXT NOT NULL,
    "start_at_time" TEXT NOT NULL,
    "end_at_time" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "queues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queue_members" (
    "id" SERIAL NOT NULL,
    "queue_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_paused" BOOLEAN NOT NULL DEFAULT false,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "queue_members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "queues" ADD CONSTRAINT "queues_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue_members" ADD CONSTRAINT "queue_members_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "queues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue_members" ADD CONSTRAINT "queue_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
