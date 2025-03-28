-- DropForeignKey
ALTER TABLE `user_esemenyek` DROP FOREIGN KEY `User_esemenyek_esemenyek_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_esemenyek` DROP FOREIGN KEY `User_esemenyek_user_id_fkey`;

-- DropIndex
DROP INDEX `User_esemenyek_esemenyek_id_key` ON `user_esemenyek`;

-- DropIndex
DROP INDEX `User_esemenyek_user_id_key` ON `user_esemenyek`;

-- DropIndex
DROP INDEX `Users_email_key` ON `users`;

-- AlterTable
ALTER TABLE `esemenyek` ADD COLUMN `foszam` INTEGER NULL;

-- AlterTable
ALTER TABLE `user_esemenyek` ADD PRIMARY KEY (`user_id`, `esemenyek_id`);

-- CreateTable
CREATE TABLE `contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(30) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `uzenet` TEXT NOT NULL,
    `kiirat` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_esemenyek` ADD CONSTRAINT `User_esemenyek_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_esemenyek` ADD CONSTRAINT `User_esemenyek_esemenyek_id_fkey` FOREIGN KEY (`esemenyek_id`) REFERENCES `Esemenyek`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
