import { 
  users, tasks, 
  type User, type Task, 
  type InsertUser, type InsertTask, 
  type UpdateUser, type UpdateTask 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: UpdateUser): Promise<User | undefined>;
  
  // Task methods
  getTasks(userId: number): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, taskData: UpdateTask): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tasks: Map<number, Task>;
  private userIdCounter: number;
  private taskIdCounter: number;

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
    this.userIdCounter = 1;
    this.taskIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id,
      respectLevel: 50,
      streak: 0,
      bestStreak: 0,
      lastCompletedDate: null,
      aiPersonality: insertUser.aiPersonality || "balanced"
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: UpdateUser): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Task methods
  async getTasks(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.userId === userId
    );
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.taskIdCounter++;
    const now = new Date();
    const task: Task = {
      ...insertTask,
      id,
      completed: false,
      dueDate: insertTask.dueDate || null,
      priority: insertTask.priority || "medium",
      createdAt: now
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, taskData: UpdateTask): Promise<Task | undefined> {
    const task = await this.getTask(id);
    if (!task) return undefined;

    const updatedTask = { ...task, ...taskData };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<boolean> {
    const exists = this.tasks.has(id);
    if (exists) {
      this.tasks.delete(id);
    }
    return exists;
  }
}

export const storage = new MemStorage();
