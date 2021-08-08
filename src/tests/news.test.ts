import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";
import { testRegister, testLogin } from "../utils/testUtils";

const prisma = new PrismaClient();
let accessToken: string; // Create a global accessToken variable
let server: any; // Create a new server instance
let port: number;

describe("[-----NEWS-----]", () => {
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

  // news tests
  describe("[GET] --> /news", () => {
    // returns news data successfully [200]
    it("returns news data successfully [200]", async () => {
      const response = await request(server)
        .get("/api/news")
        .query({
          topic: "Bitcoin",
        })
        .set({
          Authorization: `Bearer ${accessToken}`,
        });

      expect(response.status).toBe(200);
      expect(response.body.totalResults).toBeGreaterThan(0);
    });

    // returns the user is not authorized [401]
    it("returns the user is not authorized [401]", async () => {
      const response = await request(server)
        .get("/api/news")
        .query({
          topic: "Bitcoin",
        })
        .set({
          Authorization: `Bearer 12345`,
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    // returns invalid input [400]
    it("returns invalid input [400]", async () => {
      const response = await request(server)
        .get("/api/news")
        .query({})
        .set({
          Authorization: `Bearer ${accessToken}`,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns no any news was found [400]
    it("returns no any news was found [200]", async () => {
      const response = await request(server)
        .get("/api/news")
        .query({
          topic: "randomtestinput12345",
        })
        .set({
          Authorization: `Bearer ${accessToken}`,
        });

      expect(response.status).toBe(200);
      expect(response.body.totalResults).toBe(0);
    });
  });
});
