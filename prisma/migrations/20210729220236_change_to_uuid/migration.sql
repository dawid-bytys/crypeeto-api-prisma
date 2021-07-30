/*
  Warnings:

  - The primary key for the `cryptocurrencies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `cryptocurrencies` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - The primary key for the `wallets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cryptocurrency_id` on the `wallets` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `wallets` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `wallets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `cryptocurrencies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `wallets` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `cryptocurrencies` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `cryptocurrency_uuid` to the `wallets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_uuid` to the `wallets` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `wallets` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `wallets` DROP FOREIGN KEY `wallets_ibfk_2`;

-- DropForeignKey
ALTER TABLE `wallets` DROP FOREIGN KEY `wallets_ibfk_1`;

-- DropIndex
DROP INDEX `cryptocurrencies.id_unique` ON `cryptocurrencies`;

-- DropIndex
DROP INDEX `users.id_unique` ON `users`;

-- DropIndex
DROP INDEX `wallets.id_unique` ON `wallets`;

-- AlterTable
ALTER TABLE `cryptocurrencies` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uuid`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uuid`);

-- AlterTable
ALTER TABLE `wallets` DROP PRIMARY KEY,
    DROP COLUMN `cryptocurrency_id`,
    DROP COLUMN `id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `cryptocurrency_uuid` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_uuid` VARCHAR(191) NOT NULL,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `cryptocurrencies.uuid_unique` ON `cryptocurrencies`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `users.uuid_unique` ON `users`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `wallets.uuid_unique` ON `wallets`(`uuid`);

-- AddForeignKey
ALTER TABLE `wallets` ADD FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallets` ADD FOREIGN KEY (`cryptocurrency_uuid`) REFERENCES `cryptocurrencies`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
