import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const envSchema = z.object({
  PORT: z.string().default("3000"),
  MODE: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string({
    required_error: "DATABASE_URL is required in the environment variables",
  }),
});

export const envConfig = envSchema.parse({
  PORT: process.env.PORT || "3000",
  MODE: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL,
});

export const appConfig = {
  allowedOrigins: ["http://localhost:5173"],
};
