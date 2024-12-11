const request = require("supertest");
const app = require("../../server");
const { User } = require("../models");
require("../tests/setup");

describe("UserController", () => {
  test("should register a new user", async () => {
    const response = await request(app).post("/api/v1/register").send({
      name: "John Doe",
      email: "john@gmail.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
    const user = await User.findOne({ email: "john@gmail.com" });
    expect(user).not.toBeNull();
  });

  test("should prevent duplicate user registration", async () => {
    await User.create({
      name: "John Doe",
      email: "john1@gmail.com",
      password: "password123",
    });

    const response = await request(app).post("/api/v1/register").send({
      name: "John Doe",
      email: "john1@gmail.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });

  test("should login a user with correct credentials", async () => {
    await User.create({
      name: "John Doe",
      email: "john2@gmail.com",
      password: "password123",
    });

    const response = await request(app)
      .post("/api/v1/login")
      .send({ email: "john2@gmail.com", password: "password123" });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).not.toBeNull();
  });

  test("should reject login with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ email: "invalid@example.com", password: "password123" });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
