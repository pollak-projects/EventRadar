/*
  Warnings:

  - Added the required column `helyszin` to the `Esemenyek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `esemenyek` ADD COLUMN `helyszin` VARCHAR(191) NOT NULL;
