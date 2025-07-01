import { Router } from "express";
import {
  // getSpeakerApplication,
  // getAllSpeakerApplications,
  createSpeakerApplication,
} from "./speaker.controller";

const speakerRouter = Router();

// Public routes
speakerRouter.post("/", createSpeakerApplication);

// Protected routes (require authentication)
// speakerRouter.get("/:id", getSpeakerApplication);
// speakerRouter.get("/", getAllSpeakerApplications);

export default speakerRouter;
