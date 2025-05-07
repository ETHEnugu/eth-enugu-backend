import express, { Express } from "express";
import config, { isDevMode, validateConfig } from "./config";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error-handler.middleware";
import routes from "./routes";
import { concatLog } from "./utils/log.util";
import { corsMiddleware } from "./middlewares/cors.middleware";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
export const prisma = new PrismaClient();

// Middleware
app.use(corsMiddleware());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);
app.get("/", (_, res) => {
  res.json({ status: "ok" });
});

app.use(notFoundHandler);
app.use(errorHandler);

validateConfig().then(() => {
  app.listen(config.PORT, () => {
    console.log(
      concatLog(
        `Environment is ${isDevMode ? "development" : "production"}`,
        `Server is running at http://localhost:${config.PORT}`
      )
    );
  });
});
