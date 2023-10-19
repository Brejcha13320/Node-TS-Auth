/*
  Warnings:

  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;
