import { Router } from "express";
import { renderHome, renderRealTime } from "../controllers/views.js";

const router = Router();

router.get("/", renderHome);
router.get("/realtimeproducts", renderRealTime);

export default router;
