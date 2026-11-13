import { Router } from "express";
import { receiveWebhook } from "../controllers/webhook.controller";
import { validate } from "../middleware/validate";
import { webhookSchema } from "../validators/webhook.schema";

const router = Router();

router.post("/", validate(webhookSchema), receiveWebhook);

export default router;
