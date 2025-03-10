/*
  Warnings:

  - Added the required column `esemeny_hossz` to the `Esemenyek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `esemenyek` ADD COLUMN `esemeny_hossz` INTEGER NOT NULL,
    MODIFY `updated_date` DATETIME(3) NULL;
