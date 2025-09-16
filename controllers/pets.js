
import { Router } from "express";
import { getPets } from "../controllers/petController.js";

const router = Router();

router.get("/", getPets);

export default router;
