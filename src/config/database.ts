import knex from "knex";

const database = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
});

export const checkDatabaseConnection = async (): Promise<void> => {
  await database.raw("SELECT 1");
};

export default database;
