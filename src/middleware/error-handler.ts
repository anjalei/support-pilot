import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

interface DatabaseError extends Error {
  code?: string;
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    next(error);
    return;
  }

  let statusCode = 500;
  let message = "Internal server error";
  let details: unknown;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    details = error.details;
  } else {
    const dbError = error as DatabaseError;

    switch (dbError.code) {
      case "23505":
        statusCode = 409;
        message = "Resource already exists";
        break;

      case "23503":
        statusCode = 409;
        message = "Referenced resource does not exist";
        break;

      case "23502":
      case "22P02":
      case "23514":
        statusCode = 400;
        message = "Invalid database input";
        break;
    }
  }

  if (statusCode >= 500) {
    console.error("Unexpected server error:", error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details !== undefined && { errors: details }),
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
};
