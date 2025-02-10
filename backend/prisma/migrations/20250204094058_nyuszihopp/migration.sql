/*
  Warnings:

  - Added the required column `groupsNeve` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `groupsNeve` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Groups` (
    `neve` VARCHAR(191) NOT NULL,
    `write` BOOLEAN NOT NULL DEFAULT false,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `update` BOOLEAN NOT NULL DEFAULT false,
    `delete` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`neve`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `maindata` (
    `id` VARCHAR(191) NOT NULL,
    `JWTSecret` VARCHAR(191) NOT NULL,
    `JWTExpiration` INTEGER NOT NULL,
    `JWTAlgorithm` VARCHAR(191) NOT NULL,
    `RefreshTokenSecret` VARCHAR(191) NOT NULL,
    `RefreshTokenExpiration` INTEGER NOT NULL,
    `RefreshTokenAlgorithm` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_groupsNeve_fkey` FOREIGN KEY (`groupsNeve`) REFERENCES `Groups`(`neve`) ON DELETE RESTRICT ON UPDATE CASCADE;
