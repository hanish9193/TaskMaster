import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  respectLevel: integer("respect_level").notNull().default(50),
  streak: integer("streak").notNull().default(0),
  bestStreak: integer("best_streak").notNull().default(0),
  lastCompletedDate: text("last_completed_date"),
  aiPersonality: text("ai_personality").notNull().default("balanced"),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  dueDate: text("due_date"),
  priority: text("priority").notNull().default("medium"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  aiPersonality: true,
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  userId: true,
  title: true,
  dueDate: true,
  priority: true,
});

export const updateTaskSchema = createInsertSchema(tasks).pick({
  completed: true,
  title: true,
  dueDate: true,
  priority: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  respectLevel: true,
  streak: true,
  bestStreak: true,
  lastCompletedDate: true,
  aiPersonality: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type User = typeof users.$inferSelect;
export type Task = typeof tasks.$inferSelect;
