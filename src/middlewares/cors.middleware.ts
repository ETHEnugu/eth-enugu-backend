import cors from "cors";
import { isDevMode } from "../config";

const allowedOrigins = ["https://yourdomain.com"];

export const corsMiddleware = () =>
  isDevMode
    ? cors()
    : cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true, // allow cookies if needed
      });
