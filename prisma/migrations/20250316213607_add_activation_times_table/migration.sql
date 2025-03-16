-- CreateTable
CREATE TABLE "spaces_activation_times" (
    "id" SERIAL NOT NULL,
    "space_id" INTEGER NOT NULL,
    "day_of_week" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,

    CONSTRAINT "spaces_activation_times_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "spaces_activation_times" ADD CONSTRAINT "spaces_activation_times_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
