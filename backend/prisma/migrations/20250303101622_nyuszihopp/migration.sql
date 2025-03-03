/*
  Warnings:

  - Made the column `update_date` on table `ertesites` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ertesites` MODIFY `update_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
