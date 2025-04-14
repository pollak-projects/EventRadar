/*
  Warnings:

  - You are about to drop the column `vegeido` on the `esemenyek` table. All the data in the column will be lost.
  - Added the required column `hossz` to the `Esemenyek` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_esemenyek` DROP FOREIGN KEY `User_esemenyek_esemenyek_id_fkey`;

-- DropIndex
DROP INDEX `User_esemenyek_esemenyek_id_fkey` ON `user_esemenyek`;

-- AlterTable
ALTER TABLE `esemenyek` DROP COLUMN `vegeido`,
    ADD COLUMN `hossz` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `eventcat` ADD COLUMN `image` LONGBLOB NULL;

-- AddForeignKey
ALTER TABLE `User_esemenyek` ADD CONSTRAINT `User_esemenyek_esemenyek_id_fkey` FOREIGN KEY (`esemenyek_id`) REFERENCES `Esemenyek`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
