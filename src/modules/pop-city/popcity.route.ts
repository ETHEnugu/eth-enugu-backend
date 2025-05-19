import { Router } from "express";
import {
  getPopupRegistration,
  getAllPopupRegistrations,
  createPopupRegistration,
  deletePopupRegistration,
} from "./popcity.controller";

const popupCityRouter = Router();

// Public routes
popupCityRouter.post("/popup", createPopupRegistration);

// Protected routes (require authentication)
popupCityRouter.get("/popup/:id", getPopupRegistration);
popupCityRouter.get("/popup", getAllPopupRegistrations);

// Admin-only routes

popupCityRouter.delete("/popup/:id", deletePopupRegistration);

export default popupCityRouter;
