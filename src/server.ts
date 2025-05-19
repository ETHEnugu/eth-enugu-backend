import app from "./app";

import { envConfig } from "./config";
import { logger } from "./utils/logger.utils";
import { prisma } from "./utils/prisma.utils";

async function startServer() {
  try {
    await prisma.$connect();
    logger.info("Connected to database");

    app.listen(3000, () => {
      console.log(`Server running on port ${envConfig.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("💾 Database connection closed");

  console.log("👋 Shutdown complete");
  process.exit(0);
});

startServer();
