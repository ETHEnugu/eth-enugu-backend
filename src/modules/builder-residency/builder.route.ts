import { Router } from "express";
import {
  getResidency,
  getAllResidencies,
  createBuilderResidency,
} from "./builder.controller";

const builderResidencyRouter = Router();

// Public routes
builderResidencyRouter.post("/builder", createBuilderResidency);

// Protected routes (require authentication)
builderResidencyRouter.get("/builder/:id", getResidency);
builderResidencyRouter.get("/builder", getAllResidencies);

export default builderResidencyRouter;
