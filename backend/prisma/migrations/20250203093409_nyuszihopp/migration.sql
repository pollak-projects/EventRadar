-- CreateTable
CREATE TABLE `Ertekeles` (
    `ertekeles_id` INTEGER NOT NULL AUTO_INCREMENT,
    `esemenyek_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `create_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ertekeles_esemenyek_id_key`(`esemenyek_id`),
    UNIQUE INDEX `Ertekeles_user_id_key`(`user_id`),
    PRIMARY KEY (`ertekeles_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ertesites` (
    `ertesites_id` INTEGER NOT NULL AUTO_INCREMENT,
    `esemenyek_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `create_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Ertesites_esemenyek_id_key`(`esemenyek_id`),
    UNIQUE INDEX `Ertesites_user_id_key`(`user_id`),
    PRIMARY KEY (`ertesites_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Esemenyek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `esemeny_nev` VARCHAR(191) NOT NULL,
    `leiras` VARCHAR(191) NOT NULL,
    `esemeny_date` DATETIME(3) NOT NULL,
    `create_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_esemenyek` (
    `user_id` INTEGER NOT NULL,
    `esemenyek_id` INTEGER NOT NULL,
    `join_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_esemenyek_user_id_key`(`user_id`),
    UNIQUE INDEX `User_esemenyek_esemenyek_id_key`(`esemenyek_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `create_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ertekeles` ADD CONSTRAINT `Ertekeles_esemenyek_id_fkey` FOREIGN KEY (`esemenyek_id`) REFERENCES `Esemenyek`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ertekeles` ADD CONSTRAINT `Ertekeles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ertesites` ADD CONSTRAINT `Ertesites_esemenyek_id_fkey` FOREIGN KEY (`esemenyek_id`) REFERENCES `Esemenyek`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ertesites` ADD CONSTRAINT `Ertesites_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_esemenyek` ADD CONSTRAINT `User_esemenyek_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_esemenyek` ADD CONSTRAINT `User_esemenyek_esemenyek_id_fkey` FOREIGN KEY (`esemenyek_id`) REFERENCES `Esemenyek`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
