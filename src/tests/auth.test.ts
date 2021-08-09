import prisma from "../prisma";
import request from "supertest";
import app from "../app";
import { testLogin } from "../utils/testUtils";

// Create a new server instance
let server: any;
let port: number;

describe("[-----AUTHORIZATION-----]", () => {
  // before all tests, clear the database
  beforeAll(async () => {
    server = app.listen();
    port = server.address().port;

    await prisma.wallet.deleteMany({});
    await prisma.user.deleteMany({});
  });

  // Close the server after all test
  afterAll(() => {
    server.close();
  });

  describe("[POST] --> /register", () => {
    // registers successfully [200]
    it("registers successfully [200]", async () => {
      const response = await request(server).post("/api/register").send({
        username: "testusername",
        password: "TestPassword123!",
        email: "test@test.com",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Successfully registered");
    });

    // returns the input is invalid (no any data) [400]
    it("returns the input is invalid (no any data) [400]", async () => {
      const response = await request(server).post("/api/register").send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the input is invalid (no username) [400]
    it("returns the input is invalid (no username) [400]", async () => {
      const response = await request(server).post("/api/register").send({
        password: "TestPassword123!",
        email: "test@test.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the input is invalid (no password) [400]
    it("returns the input is invalid (no password) [400]", async () => {
      const response = await request(server).post("/api/register").send({
        username: "testusername",
        email: "test@test.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the input is invalid (no email) [400]
    it("returns the input is invalid (no email) [400]", async () => {
      const response = await request(server).post("/api/register").send({
        username: "testusername",
        password: "TestPassword123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the input is invalid (no username and password) [400]
    it("returns the input is invalid (no username and password) [400]", async () => {
      const response = await request(server).post("/api/register").send({
        email: "test@test.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the input is invalid (no username and email) [400]
    it("returns the input is invalid (no username and email) [400]", async () => {
      const response = await request(server).post("/api/register").send({
        password: "TestPassword123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the input is invalid (no password and email) [400]
    it("returns the input is invalid (no password and email) [400]", async () => {
      const response = await request(server).post("/api/register").send({
        username: "testusername",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the username does not meet the requirements [400]
    it("returns the username does not meet the requirements [400]", async () => {
      const response = await request(server).post("/api/register").send({
        username: "../",
        password: "TestPassword123!",
        email: "test@test.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Username must meet the requirements");
    });

    // returns the password does not meet the requirement [400]
    it("returns the password does not meet the requirements [400]", async () => {
      const response = await request(server).post("/api/register").send({
        username: "testusername",
        password: "testpassword123",
        email: "test@test.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password must meet the requirements");
    });

    // returns the email doest not meet the requirement [400]
    it("returns the email does not meet the requirements [400]", async () => {
      const response = await request(server).post("/api/register").send({
        username: "testusername",
        password: "TestPassword123!",
        email: "test@@test.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("E-mail must meet the requirements");
    });

    // returns the username or the email already exists (provided existing username) [400]
    it("returns the username or the e-mail already exists (provided existing username) [400]", async () => {
      const response = await request(server).post("/api/register").send({
        username: "testusername",
        password: "TestPassword123!",
        email: "test123@test123.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Username or e-mail already exists in the database"
      );
    });

    // returns the username or the email already exists (provided existing email) [400]
    it("returns the username or the e-mail already exists (provided existing email) [400]", async () => {
      const response = await request(server).post("/api/register").send({
        username: "testusername123",
        password: "TestPassword123!",
        email: "test@test.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Username or e-mail already exists in the database"
      );
    });

    // returns the username or the email already exists (provided existing username and email) [400]
    it("returns the username or the e-mail already exists (provided existing username and email) [400]", async () => {
      const response = await request(server).post("/api/register").send({
        username: "testusername",
        password: "TestPassword123!",
        email: "test@test.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Username or e-mail already exists in the database"
      );
    });
  });

  describe("[POST] --> /login", () => {
    // logins successfully (returns accessToken) [200]
    it("logins successfully (returns accessToken) [200]", async () => {
      const response = await request(server).post("/api/login").send({
        username: "testusername",
        password: "TestPassword123!",
      });

      expect(response.status).toBe(200);
      expect(typeof response.body.access_token).toBe("string");
      expect(response.body.access_token.length).toBeGreaterThan(1);
    });

    // returns the input is invalid (no any data) [400]
    it("returns the input is invalid (no any data) [400]", async () => {
      const response = await request(server).post("/api/login").send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the input is invalid (no username) [400]
    it("returns the input is invalid (no username) [400]", async () => {
      const response = await request(server).post("/api/login").send({
        password: "TestPassword123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns the input is invalid (no password) [400]
    it("returns the input is invalid (no password) [400]", async () => {
      const response = await request(server).post("/api/login").send({
        username: "testusername",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid input");
    });

    // returns invalid username or password (username does not exists in the database) [400]
    it("returns the input is invalid (username does not exists in the database) [400]", async () => {
      const response = await request(server).post("/api/login").send({
        username: "testusername123",
        password: "TestPassword123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid username or password");
    });

    // returns invalid username or password (password is invalid) [400]
    it("returns the input is invalid (password is invalid) [400]", async () => {
      const response = await request(server).post("/api/login").send({
        username: "testusername",
        password: "TestPassword1234!",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid username or password");
    });
  });

  describe("[GET] --> /auth", () => {
    // returns that the user is authorized [200]
    it("returns that the user is authorized [200]", async () => {
      const accessToken = await testLogin(port);

      const response = await request(app)
        .get("/api/auth")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.is_authorized).toBe(true);
    });

    // returns that the user is not authorized (no accessToken provided) [401]
    it("returns that the user is not authorized (no accessToken provided) [401]", async () => {
      const response = await request(app).get("/api/auth");

      expect(response.status).toBe(401);
      expect(response.body.is_authorized).toBe(false);
    });

    // returns that the user is not authorized (invalid or expired accessToken) [401]
    it("returns that the user is not authorized (invalid or expired accessToken) [401]", async () => {
      const response = await request(server)
        .get("/api/auth")
        .set("Authorization", `Bearer 12345`);

      expect(response.status).toBe(401);
      expect(response.body.is_authorized).toBe(false);
    });
  });
});
