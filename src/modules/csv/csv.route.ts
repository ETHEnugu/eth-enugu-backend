import { Router } from "express";
import GetBuilderResidencyCSV from "./builder-csv.controller";
import GetConferenceCSV from "./conference-csv.controller";
import GetSpeakerCSV from "./speaker-csv.controller";
import GetPopupCSV from "./popup-csv.controller";

const CSVRouter = Router();

CSVRouter.get("/builder", GetBuilderResidencyCSV);
CSVRouter.get("/conference", GetConferenceCSV);
CSVRouter.get("/speaker", GetSpeakerCSV);
CSVRouter.get("/popup", GetPopupCSV);

export default CSVRouter;
