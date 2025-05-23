import { Router } from "express";
import {
  getConferenceRegistration,
  getAllConferenceRegistrations,
  createConferenceRegistration,
  deleteConferenceRegistration,
} from "./conference.controller";

const conferenceSummitRouter = Router();

// Public routes
conferenceSummitRouter.post("/", createConferenceRegistration);

// Protected routes (require authentication)
conferenceSummitRouter.get("/:id", getConferenceRegistration);
conferenceSummitRouter.get("/", getAllConferenceRegistrations);

// Admin-only routes

conferenceSummitRouter.delete("/:id", deleteConferenceRegistration);

export default conferenceSummitRouter;
