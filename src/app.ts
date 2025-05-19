import express, { Express } from "express";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error-handler.middleware";
import routes from "./routes";
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
app.use("/api", routes);
app.get("/", (_, res) => {
  res.json({ status: "ok" });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
