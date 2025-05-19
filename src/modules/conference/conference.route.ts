import { Router } from "express";
import {
  getConferenceRegistration,
  getAllConferenceRegistrations,
  createConferenceRegistration,
  deleteConferenceRegistration,
} from "./conference.controller";

const conferenceSummitRouter = Router();

// Public routes
conferenceSummitRouter.post("/conference", createConferenceRegistration);

// Protected routes (require authentication)
conferenceSummitRouter.get(
  "/conference/:id",

  getConferenceRegistration
);
conferenceSummitRouter.get(
  "/conference",

  getAllConferenceRegistrations
);

// Admin-only routes

conferenceSummitRouter.delete("/conference/:id", deleteConferenceRegistration);

export default conferenceSummitRouter;
