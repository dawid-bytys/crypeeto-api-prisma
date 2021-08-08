-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "cryptocurrencies" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "wallets" (
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "cryptocurrency_uuid" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,

    PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.uuid_unique" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users.username_unique" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cryptocurrencies.uuid_unique" ON "cryptocurrencies"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "cryptocurrencies.name_unique" ON "cryptocurrencies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cryptocurrencies.abbreviation_unique" ON "cryptocurrencies"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "wallets.uuid_unique" ON "wallets"("uuid");

-- AddForeignKey
ALTER TABLE "wallets" ADD FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD FOREIGN KEY ("cryptocurrency_uuid") REFERENCES "cryptocurrencies"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
