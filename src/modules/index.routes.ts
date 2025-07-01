import { Router } from "express";
import popupCityRouter from "./pop-city/popcity.route";
import builderResidencyRouter from "./builder-residency/builder.route";
import conferenceSummitRouter from "./conference/conference.route";
import speakerRouter from "./speaker/speaker.route";
import dpRouter from "./dp/dp.route";
import CSVRouter from "./csv/csv.route";

const router = Router();

const apiRouter = Router();

// Register all feature routes under the /api/v1 prefix
apiRouter.use("/builder", builderResidencyRouter);
apiRouter.use("/conference", conferenceSummitRouter);
apiRouter.use("/popup", popupCityRouter);
apiRouter.use("/speaker", speakerRouter);
apiRouter.post("/dp", dpRouter);
apiRouter.use("/csv", CSVRouter);

router.use("/api/v1", apiRouter);

export default router;
