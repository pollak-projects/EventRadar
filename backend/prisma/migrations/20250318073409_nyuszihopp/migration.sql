/*
  Warnings:

  - Added the required column `user` to the `Esemenyek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `esemenyek` ADD COLUMN `user` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Esemenyek` ADD CONSTRAINT `Esemenyek_user_fkey` FOREIGN KEY (`user`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
