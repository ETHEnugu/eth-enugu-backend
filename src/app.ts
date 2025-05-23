import express, { Express } from "express";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error-handler.middleware";
import router from "./modules/index.routes";
import { corsMiddleware } from "./middlewares/cors.middleware";
import helmet from "helmet";
import morgan from "morgan";

const app: Express = express();

// Middleware
app.use(corsMiddleware());
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
