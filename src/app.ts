import express from "express";
import cors from "cors";
import helmet from "helmet";
import webhookRoutes from "./routes/webhook.routes";
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

export default app;
