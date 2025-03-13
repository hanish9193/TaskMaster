import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTaskSchema, 
  updateTaskSchema, 
  insertUserSchema, 
  updateUserSchema 
} from "@shared/schema";
import { z, ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = express.Router();

  // User routes
  router.post("/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.format() });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  router.patch("/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const userData = updateUserSchema.parse(req.body);
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const updatedUser = await storage.updateUser(id, userData);
      res.json(updatedUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.format() });
      }
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  router.get("/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Task routes
  router.get("/users/:userId/tasks", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const tasks = await storage.getTasks(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to get tasks" });
    }
  });

  router.post("/users/:userId/tasks", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const taskData = insertTaskSchema.parse({ ...req.body, userId });
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid task data", errors: error.format() });
      }
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  router.patch("/tasks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const taskData = updateTaskSchema.parse(req.body);
      
      const task = await storage.getTask(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      const updatedTask = await storage.updateTask(id, taskData);
      res.json(updatedTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid task data", errors: error.format() });
      }
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  router.delete("/tasks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await storage.deleteTask(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
  });

  // Mount the router
  app.use("/api", router);

  const httpServer = createServer(app);
  return httpServer;
}
