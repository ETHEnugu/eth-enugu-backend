import { Router } from "express";
import {
  // getPopupRegistration,
  // getAllPopupRegistrations,
  createPopupRegistration,
  // deletePopupRegistration,
} from "./popcity.controller";

const popupCityRouter = Router();

// Public routes
popupCityRouter.post("/", createPopupRegistration);

// Protected routes (require authentication)
// popupCityRouter.get("/:id", getPopupRegistration);
// popupCityRouter.get("/", getAllPopupRegistrations);

// Admin-only routes

// popupCityRouter.delete("/:id", deletePopupRegistration);

export default popupCityRouter;
