import { Router } from "express";
import {
  getResidency,
  getAllResidencies,
  createBuilderResidency,
  deleteResidency,
} from "./builder.controller";

const builderResidencyRouter = Router();

builderResidencyRouter.post("/", createBuilderResidency);

builderResidencyRouter.get("/:id", getResidency);
builderResidencyRouter.get("/", getAllResidencies);

builderResidencyRouter.delete("/:id", deleteResidency);

export default builderResidencyRouter;
