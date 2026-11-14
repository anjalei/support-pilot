import express from "express";
import cors from "cors";
import helmet from "helmet";

import webhookRoutes from "./routes/webhook.routes";
import { AppError } from "./errors/app-error";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/webhooks", webhookRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SupportPilot API is running",
  });
});

// Handle unknown routes
app.use((req, res, next) => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
});

// Centralized error handler (must be last)
app.use(errorHandler);

export default app;
