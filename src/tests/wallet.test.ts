import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";
import { testRegister, testLogin } from "../utils/testUtils";

const prisma = new PrismaClient();
let accessToken: string; // Create a global accessToken variable
let server: any; // Create a new server instance
let port: string;

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

  // wallet currency exchange tests
  //describe("[POST] --> /wallet/exchange", () => {
  //
  //})
});
