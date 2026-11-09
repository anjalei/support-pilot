import "dotenv/config";

import app from "./app";
import database, { checkDatabaseConnection } from "./config/database";

const PORT = Number(process.env.PORT) || 8000;

const startServer = async (): Promise<void> => {
  try {
    await checkDatabaseConnection();

    console.log("PostgreSQL connected successfully");

    app.listen(PORT, () => {
      console.log(`SupportPilot running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to PostgreSQL:", error);
    await database.destroy();
    process.exit(1);
  }
};

void startServer();
