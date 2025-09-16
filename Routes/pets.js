import { Router } from "express";
import { getPets, getPetById } from "../controllers/petController.js";

const router = Router();

router.get("/", getPets);
router.get("/:id", getPetById);

export default router;
