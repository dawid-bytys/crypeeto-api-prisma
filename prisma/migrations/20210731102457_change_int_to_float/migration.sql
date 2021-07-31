/*
  Warnings:

  - You are about to alter the column `amount` on the `wallets` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `wallets` MODIFY `amount` DOUBLE NOT NULL DEFAULT 0;
