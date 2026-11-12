import knex from "knex";
import knexConfig from "./knex-config";

const database = knex(knexConfig);

export const checkDatabaseConnection = async (): Promise<void> => {
  await database.raw("SELECT 1");
};

export default database;
