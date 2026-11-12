import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // 1. Organizations
  await knex.schema.createTable("organizations", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table.string("name", 150).notNullable();
    table.string("slug", 150).notNullable().unique();

    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  // 2. Tickets
  await knex.schema.createTable("tickets", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("organization_id")
      .notNullable()
      .references("id")
      .inTable("organizations")
      .onDelete("CASCADE");

    table.string("external_ticket_id", 150).notNullable();
    table.string("title", 255).notNullable();
    table.text("description").nullable();
    table.string("requester_email", 255).nullable();

    table.string("source", 50).notNullable();
    table.string("status", 30).notNullable().defaultTo("open");
    table.string("priority", 30).notNullable().defaultTo("normal");

    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.unique(
      ["organization_id", "external_ticket_id"],
      "tickets_org_external_id_unique",
    );

    table.index(["organization_id", "status"]);
    table.index(["organization_id", "priority"]);
  });

  // 3. Webhook events
  await knex.schema.createTable("webhook_events", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("organization_id")
      .notNullable()
      .references("id")
      .inTable("organizations")
      .onDelete("CASCADE");

    table.string("provider_event_id", 255).notNullable();
    table.string("event_type", 100).notNullable();
    table.jsonb("payload").notNullable();

    table.string("status", 30).notNullable().defaultTo("received");
    table.integer("attempts").notNullable().defaultTo(0);
    table.text("last_error").nullable();

    table
      .timestamp("received_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp("processed_at", { useTz: true }).nullable();

    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.unique(
      ["organization_id", "provider_event_id"],
      "webhook_events_org_provider_event_unique",
    );

    table.index(["organization_id", "status"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("webhook_events");
  await knex.schema.dropTableIfExists("tickets");
  await knex.schema.dropTableIfExists("organizations");
}
