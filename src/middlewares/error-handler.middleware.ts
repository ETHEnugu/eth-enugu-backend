import { NextFunction, Request, Response } from "express";
import { isDevMode } from "../config";

export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new ApiError(404, `Route not found: ${req.originalUrl}`);
  next(error);
};

// Global error handler middleware
export const errorHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${err.name}: ${err.message}`);
  console.error(err.stack);

  // Default error values
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Something went wrong";
  const isOperational = err instanceof ApiError ? err.isOperational : false;

  // Different response structure based on environment
  const responseBody = isDevMode
    ? {
        status: "error",
        message,
        stack: err.stack,
        isOperational,
      }
    : {
        status: "error",
        message: isOperational ? message : "Internal server error",
      };

  res.status(statusCode).json(responseBody);
};

// Helper functions for common errors
export const notFoundError = (resource: string) => {
  return new ApiError(404, `${resource} not found`);
};

export const badRequestError = (message: string) => {
  return new ApiError(400, message);
};

export const unauthorizedError = (message = "Unauthorized") => {
  return new ApiError(401, message);
};

export const forbiddenError = (message = "Forbidden") => {
  return new ApiError(403, message);
};
