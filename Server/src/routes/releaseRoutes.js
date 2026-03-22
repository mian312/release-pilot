import express from "express";
import * as releaseController from "../controllers/releaseController.js";

const router = express.Router();

router.get("/", releaseController.getAllReleases);
router.post("/", releaseController.createRelease);
router.patch("/:id", releaseController.updateReleaseInfo);
router.patch("/:id/steps", releaseController.updateReleaseSteps);

export default router;
