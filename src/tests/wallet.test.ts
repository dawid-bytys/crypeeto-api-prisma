import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";
import { testRegister, testLogin } from "../utils/testUtils";

const prisma = new PrismaClient();
let accessToken: string; // Create a global accessToken variable
let server: any; // Create a new server instance
let port: number;

describe("[-----WALLET-----]", () => {
  // before all tests, clear the database, register and login to get an accessToken
  beforeAll(async () => {
    server = app.listen();
    port = server.address().port;

    await prisma.wallet.deleteMany({});
    await prisma.user.deleteMany({});
    await testRegister(port);
    accessToken = await testLogin(port);
  });

  // Close the server after all test
  afterAll(() => {
    server.close();
  });

  // wallet creation tests
  describe("[POST] --> /wallet/create", () => {
    // creates a new 'Bitcoin' wallet successfully [200]
    it("creates a new 'Bitcoin' wallet successfully [200]", async () => {
      const response = await request(server)
        .post("/api/wallet/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Bitcoin",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Your new wallet has been successfully created"
      );
    });

    // creates a new 'Ethereum' wallet successfully [200]
    it("creates a new 'Ethereum' wallet successfully [200]", async () => {
      const response = await request(server)
        .post("/api/wallet/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Ethereum",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Your new wallet has been successfully created"
      );
    });

    // creates a new 'Ripple' wallet successfully [200]
    it("creates a new 'Ripple' wallet successfully [200]", async () => {
      const response = await request(server)
        .post("/api/wallet/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Ripple",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Your new wallet has been successfully created"
      );
    });

    // creates a new 'Tether' wallet successfully [200]
    it("creates a new 'Tether' wallet successfully [200]", async () => {
      const response = await request(server)
        .post("/api/wallet/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Tether",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Your new wallet has been successfully created"
      );
    });

    // creates a new 'Stellar' wallet successfully [200]
    it("creates a new 'Stellar' wallet successfully [200]", async () => {
      const response = await request(server)
        .post("/api/wallet/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Stellar",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Your new wallet has been successfully created"
      );
    });

    // creates a new 'Litecoin' wallet successfully [200]
    it("creates a new 'Litecoin' wallet successfully [200]", async () => {
      const response = await request(server)
        .post("/api/wallet/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Litecoin",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Your new wallet has been successfully created"
      );
    });

    // returns invalid input (no any data) [400]
    it("returns invalid input (no any data) [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the provided cryptocurrency name is not supported [400]
    it("returns the provided cryptocurrency name is not supported [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "TestCoin",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "We do not support the provided currency"
      );
    });

    // returns the user already has a wallet with provided cryptocurrency name [400]
    it("returns the user already has a wallet with provided cryptocurrency name [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Bitcoin",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "You already have a wallet with provided cryptocurrency"
      );
    });
  });

  // wallet update general tests
  describe("[POST] --> /wallet/update/:type", () => {
    // returns endpoint not found (invalid input) [404]
    it("returns endpoint not found (invalid input) [404]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/test")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Endpoint not found");
    });
  });

  // wallet addition tests
  describe("[POST] --> /wallet/update/add", () => {
    // adds specified amount of money successfully [200]
    it("adds specified amount of money successfully [200]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/add")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Ethereum",
          amount: 1,
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Your wallet has been successfully updated"
      );
    });

    // returns invalid input (no any data) [400]
    it("returns invalid input (no any data) [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/add")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns invalid input (no name) [400]
    it("returns invalid input (no name) [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/add")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns invalid input (no amount) [400]
    it("returns invalid input (no amount) [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/add")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Ethereum",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the cryptocurrency is invalid [400]
    it("returns the cryptocurrency is invalid [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/add")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Dogecoin",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "We do not support the provided currency"
      );
    });

    // returns the user does not have a wallet with provided cryptocurrency [400]
    it("returns the user does not have a wallet with provided cryptocurrency [400]", async () => {
      const ethereum = await prisma.cryptocurrency.findUnique({
        where: { name: "Ethereum" },
      });

      if (ethereum) {
        await prisma.wallet.deleteMany({
          where: {
            cryptocurrencyUUID: ethereum.uuid,
          },
        });
      }

      const response = await request(server)
        .post("/api/wallet/update/add")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Ethereum",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "You do not have a wallet with provided cryptocurrency, create it first"
      );
    });

    // returns the user is not authorized (no any token) [401]
    it("returns the user is not authorized (no any token) [401]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/add")
        .set("Authorization", `Bearer `)
        .send({
          name: "Dogecoin",
          amount: 1,
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    // returns the user is not authorized (invalid or expired token) [401]
    it("returns the user is not authorized (invalid or expired token) [401]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/add")
        .set("Authorization", `Bearer 12345`)
        .send({
          name: "Dogecoin",
          amount: 1,
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });
  });
  describe("[POST] --> /wallet/update/exchange", () => {
    // exchanges specified amount of money successfully [200]
    it("exchanges specified amount of money successfully [200]", async () => {
      await prisma.wallet.updateMany({
        where: { amount: 0 },
        data: {
          amount: {
            increment: 1,
          },
        },
      });

      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "Bitcoin",
          to: "Tether",
          amount: 1,
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Your wallet has been successfully updated"
      );
    });

    // returns invalid input (no any data) [400]
    it("returns invalid input (no any data) [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns invalid input (no 'from') [400]
    it("returns invalid input (no 'from') [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          to: "Tether",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns invalid input (no 'to') [400]
    it("returns invalid input (no 'to') [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "Bitcoin",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns invalid input (no 'amount' and 'from') [400]
    it("returns invalid input (no 'amount' and 'from') [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          to: "Tether",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns invalid input (no 'amount' and 'to') [400]
    it("returns invalid input (no 'amount' and 'to') [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "Bitcoin",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns invalid input (no 'from' and 'to') [400]
    it("returns invalid input (no 'from' and 'to') [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns invalid input (amount < 0) [400]
    it("returns invalid input (amount < 0) [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "Bitcoin",
          to: "Tether",
          amount: -1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the user cannot exchange the same currency [400]
    it("returns the user cannot exchange the same currency [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "Tether",
          to: "Tether",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "You cannot exchange the same currency"
      );
    });

    // returns the user has provided invalid currency ('from') [400]
    it("returns the user has provided invalid currency ('from') [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "TestCrypto",
          to: "Tether",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "We do not support the provided currency"
      );
    });

    // returns the user has provided invalid currency ('to') [400]
    it("returns the user has provided invalid currency ('to') [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "Tether",
          to: "TestCrypto",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "We do not support the provided currency"
      );
    });

    // returns the user has provided invalid currency ('from' and 'to') [400]
    it("returns the user has provided invalid currency ('from' and 'to') [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "TestCrypto",
          to: "TestCryptoSecond",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "We do not support the provided currency"
      );
    });

    // returns the user does not have a wallet with provided cryptocurrency ('from') [400]
    it("returns the user does not have a wallet with provided cryptocurrency ('from') [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "Ethereum",
          to: "Tether",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "You either do not have a wallet with provided 'from' currency or with provided 'to' currency"
      );
    });

    // returns the user does not have a wallet with provided cryptocurrency ('to') [400]
    it("returns the user does not have a wallet with provided cryptocurrency ('to') [400]", async () => {
      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "Tether",
          to: "Ethereum",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "You either do not have a wallet with provided 'from' currency or with provided 'to' currency"
      );
    });

    // returns the user does not have a wallet with provided cryptocurrency ('from' and 'to') [400]
    it("returns the user does not have a wallet with provided cryptocurrency ('from' and 'to') [400]", async () => {
      const ripple = await prisma.cryptocurrency.findUnique({
        where: { name: "Ripple" },
      });

      if (ripple) {
        await prisma.wallet.deleteMany({
          where: {
            cryptocurrencyUUID: ripple.uuid,
          },
        });
      }

      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "Ripple",
          to: "Ethereum",
          amount: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "You either do not have a wallet with provided 'from' currency or with provided 'to' currency"
      );
    });

    // "returns the user does not have enough funds [400]"
    it("returns the user does not have enough funds [400]", async () => {
      await prisma.wallet.updateMany({
        where: { amount: 4 },
        data: {
          amount: {
            decrement: 4,
          },
        },
      });

      const response = await request(server)
        .post("/api/wallet/update/exchange")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          from: "Bitcoin",
          to: "Tether",
          amount: 3,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Not enough funds in the wallet");
    });
  });
});
