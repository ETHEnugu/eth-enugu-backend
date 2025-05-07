import dotenv from "dotenv";
import { flattenObject } from "./utils/object.util";
import { concatLog } from "./utils/log.util";

dotenv.config();

const config = {
  PORT: process.env.PORT || "3000",
  MODE: process.env.NODE_ENV || "development",
} as const;

export default config;

export const validateConfig = async () => {
  Object.entries(flattenObject(config)).forEach(([key, value]) => {
    if (!value) {
      console.error(
        concatLog(`Env for ${key} was not detected!`, `Stopping server ...`)
      );
      process.exit(1);
    }
  });
};

export const isDevMode = !["production", "prod"].includes(config.MODE);
