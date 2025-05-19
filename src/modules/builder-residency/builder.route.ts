import { Router } from "express";
import {
  getResidency,
  getAllResidencies,
  createBuilderResidency,
  deleteResidency,
} from "./builder.controller";

const builderResidencyRouter = Router();

builderResidencyRouter.post("/builder", createBuilderResidency);

builderResidencyRouter.get("/builder/:id", getResidency);
builderResidencyRouter.get("/builder", getAllResidencies);

builderResidencyRouter.delete("/builder/:id", deleteResidency);

export default builderResidencyRouter;
