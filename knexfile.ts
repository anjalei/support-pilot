import "dotenv/config";
import type { Knex } from "knex";
import knexConfig from "./src/config/knex-config";

const config: Knex.Config = {
  ...knexConfig,
  migrations: {
    directory: "./src/database/migrations",
    extension: "ts",
  },
};

export default config;
