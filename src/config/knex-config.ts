import type { Knex } from "knex";

const knexConfig: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
};

export default knexConfig;
