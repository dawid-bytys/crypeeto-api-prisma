-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `users.id_unique`(`id`),
    UNIQUE INDEX `users.username_unique`(`username`),
    UNIQUE INDEX `users.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cryptocurrencies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cryptocurrencies.id_unique`(`id`),
    UNIQUE INDEX `cryptocurrencies.name_unique`(`name`),
    UNIQUE INDEX `cryptocurrencies.abbreviation_unique`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `cryptocurrency_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `wallets.id_unique`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wallets` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallets` ADD FOREIGN KEY (`cryptocurrency_id`) REFERENCES `cryptocurrencies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
