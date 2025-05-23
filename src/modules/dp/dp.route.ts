import { Router } from "express";
import multer from "multer";
import { createDP } from "./dp.controller";

const upload = multer({ dest: "uploads/" });
const dpRouter = Router();

dpRouter.post("/dp", upload.single("avatar"), createDP);

export default dpRouter;
