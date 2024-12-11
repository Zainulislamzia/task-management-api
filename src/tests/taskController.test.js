const request = require("supertest");
const app = require("../../server");
const { Task, User } = require("../models");
const JwtService = require("../utils/jwt");
const { JWT_SECRET, JWT_EXPIRATION } = require("../config");
require("../tests/setup");

describe("TaskController", () => {
  let token, userId;

  beforeEach(async () => {
    const user = await User.create({
      name: "John Doe",
      email: `john${Date.now()}@example.com`,
      password: "password123",
    });

    userId = user._id;
    token = `Bearer ${JwtService.sign(
      { userId: user._id },
      JWT_EXPIRATION,
      JWT_SECRET
    )}`;
  });

  test("should create a new task", async () => {
    const response = await request(app)
      .post("/api/v1/tasks")
      .set("Authorization", token)
      .send({
        title: "Test Task",
        description: "A sample task",
        completed: false,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Task created successfully");
    expect(response.body.data.title).toBe("Test Task");

    const task = await Task.findById(response.body.data._id);
    expect(task.createdBy.toString()).toBe(userId.toString());
  });

  test("should fetch all tasks with pagination", async () => {
    await Task.insertMany([
      { title: "Task 1", completed: false, createdBy: userId },
      { title: "Task 2", completed: true, createdBy: userId },
    ]);

    const response = await request(app)
      .get("/api/v1/tasks?page=1&limit=1")
      .set("Authorization", token);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.totalPages).toBe(2);
    expect(response.body.currentPage).toBe(1);
  });

  test("should fetch a single task", async () => {
    const task = await Task.create({
      title: "Test Task",
      completed: false,
      createdBy: userId,
    });

    const response = await request(app)
      .get(`/api/v1/tasks/${task._id}`)
      .set("Authorization", token);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.title).toBe("Test Task");
    expect(response.body.data.createdBy).toBe(userId.toString());
  });

  test("should update a task", async () => {
    const task = await Task.create({
      title: "Old Task",
      completed: false,
      createdBy: userId,
    });

    const response = await request(app)
      .put(`/api/v1/tasks/${task._id}`)
      .set("Authorization", token)
      .send({ title: "Updated Task", completed: true });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.title).toBe("Updated Task");
    expect(response.body.data.completed).toBe(true);

    const updatedTask = await Task.findById(task._id);
    expect(updatedTask.title).toBe("Updated Task");
    expect(updatedTask.completed).toBe(true);
  });

  test("should delete a task", async () => {
    const task = await Task.create({
      title: "Task to Delete",
      completed: false,
      createdBy: userId,
    });

    const response = await request(app)
      .delete(`/api/v1/tasks/${task._id}`)
      .set("Authorization", token);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Task deleted successfully");

    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });
});
