import { Router } from "express";
import {
  getSpeakerApplication,
  getAllSpeakerApplications,
  createSpeakerApplication,
} from "./speaker.controller";

const speakerRouter = Router();

// Public routes
speakerRouter.post("/speaker", createSpeakerApplication);

// Protected routes (require authentication)
speakerRouter.get("/speaker/:id", getSpeakerApplication);
speakerRouter.get("/speaker", getAllSpeakerApplications);

export default speakerRouter;
