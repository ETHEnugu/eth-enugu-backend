import express, { Router } from "express";
import { DashboardRoute } from "./dashboard.route";

const router: Router = express.Router();

router.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/dashboard", DashboardRoute);

export default router;
