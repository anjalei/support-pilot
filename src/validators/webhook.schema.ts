import { z } from "zod";

export const webhookSchema = z
  .object({
    organizationId: z.string().uuid(),

    providerEventId: z.string().min(1).max(255),

    eventType: z.enum(["ticket.created", "ticket.updated"]),

    ticket: z
      .object({
        externalTicketId: z.string().min(1).max(150),

        title: z.string().min(1).max(255),

        description: z.string().optional(),

        requesterEmail: z.string().email().optional(),

        source: z.string().min(1).max(50),
      })
      .strict(),
  })
  .strict();

// Infer the TypeScript type from the validation schema.
export type WebhookPayload = z.infer<typeof webhookSchema>;
