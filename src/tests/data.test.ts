import { prisma } from "../prisma";
import request from "supertest";
import { app } from "../app";
import { testRegister, testLogin } from "../utils/testUtils";

let server: any; // Create a new server instance
let cookies: any;
let port: number;

describe("[-----DATA-----]", () => {
  // before all tests, clear the database, register and login to get an accessToken
  beforeAll(async () => {
    server = app.listen();
    port = server.address().port;

    await prisma.wallet.deleteMany({});
    await prisma.user.deleteMany({});
    await testRegister(port);
    const response = await testLogin(port);
    cookies = response?.headers["set-cookie"];
  });

  // Close the server after all test
  afterAll(() => {
    server.close();
  });

  describe("[GET] --> /data", () => {
    // returns chart data successfully [200]
    it("returns chart data successfully [200]", async () => {
      const response = await request(server)
        .get("/api/data")
        .query({
          symbol: "ETH/USD",
          exchange: "Binance",
          interval: "1h",
        })
        .set("cookie", cookies);

      expect(response.status).toBe(200);
      expect(typeof response.body.meta).toBe("object");
      expect(Array.isArray(response.body.values)).toBe(true);
      expect(typeof response.body.status).toBe("string");
      expect(Object.keys(response.body.meta).length).toBeGreaterThan(0);
      expect(response.body.values.length).toBeGreaterThan(0);
      expect(response.body.status).toBe("ok");
    });

    // returns the user is not authorized [401]
    it("returns the user is not authorized [401]", async () => {
      const response = await request(server)
        .get("/api/data")
        .query({
          symbol: "ETH/USD",
          exchange: "Binance",
          interval: "1h",
        })
        .set("cookie", "invalid cookies");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    // returns the user has provided invalid input (no symbol) [400]
    it("return the user has provided invalid input (no symbol) [400]", async () => {
      const response = await request(server)
        .get("/api/data")
        .query({
          exchange: "Binance",
          interval: "1h",
        })
        .set("cookie", cookies);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the user has provided invalid input (no exchange) [400]
    it("returns the user has provided invalid input (no exchange) [400]", async () => {
      const response = await request(server)
        .get("/api/data")
        .query({
          symbol: "ETH/USD",
          interval: "1h",
        })
        .set("cookie", cookies);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the user has provided invalid input (no interval) [400]
    it("returns the user has provided invalid input (no interval) [400]", async () => {
      const response = await request(server)
        .get("/api/data")
        .query({
          symbol: "ETH/USD",
          interval: "1h",
        })
        .set("cookie", cookies);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the user has provided invalid input (no symbol and exchange) [400]
    it("returns the user has provided invalid input (no symbol and exchange) [400]", async () => {
      const response = await request(server)
        .get("/api/data")
        .query({
          interval: "1h",
        })
        .set("cookie", cookies);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the user has provided invalid input (no symbol and interval) [400]
    it("returns the user has provided invalid input (no symbol and interval) [400]", async () => {
      const response = await request(server)
        .get("/api/data")
        .query({
          symbol: "ETH/USD",
        })
        .set("cookie", cookies);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the user has provided invalid input (no exchange and interval) [400]
    it("returns the user has provided invalid input (no exchange and interval) [400]", async () => {
      const response = await request(server)
        .get("/api/data")
        .query({
          interval: "1h",
        })
        .set("cookie", cookies);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });
  });
});
