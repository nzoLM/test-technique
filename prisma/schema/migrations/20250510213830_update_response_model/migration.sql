/*
  Warnings:

  - You are about to drop the column `answers` on the `Response` table. All the data in the column will be lost.
  - Added the required column `about` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Response" DROP COLUMN "answers",
ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "hobbies" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL;
