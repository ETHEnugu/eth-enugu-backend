import express, { Router } from "express";
import { dashboardOverview } from "../controllers/dashboard/dashboard-overview.controller";

const router: Router = express.Router();

router.get("/overview", dashboardOverview);

export { router as DashboardRoute };
