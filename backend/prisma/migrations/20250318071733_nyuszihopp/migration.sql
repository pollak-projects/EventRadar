/*
  Warnings:

  - You are about to drop the column `esemeny_hossz` on the `esemenyek` table. All the data in the column will be lost.
  - Added the required column `kategoria` to the `Esemenyek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kezdetido` to the `Esemenyek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vegeido` to the `Esemenyek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `esemenyek` DROP COLUMN `esemeny_hossz`,
    ADD COLUMN `kategoria` VARCHAR(191) NOT NULL,
    ADD COLUMN `kezdetido` TIME NOT NULL,
    ADD COLUMN `vegeido` TIME NOT NULL;

-- CreateTable
CREATE TABLE `Eventcat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Eventcat_nev_key`(`nev`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Esemenyek` ADD CONSTRAINT `Esemenyek_kategoria_fkey` FOREIGN KEY (`kategoria`) REFERENCES `Eventcat`(`nev`) ON DELETE RESTRICT ON UPDATE CASCADE;
