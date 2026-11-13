import { RequestHandler } from "express";
import { sendSuccess } from "../utils/api-response";
import { WebhookPayload } from "../validators/webhook.schema";

export const receiveWebhook: RequestHandler = (req, res) => {
  const payload = req.body as WebhookPayload;

  return sendSuccess(res, 200, {
    message: "Webhook payload validated successfully",
    data: {
      providerEventId: payload.providerEventId,
      eventType: payload.eventType,
    },
  });
};
