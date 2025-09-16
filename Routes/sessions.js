import { Router } from "express";
import passport from "passport";
import { register, login, current } from "../controllers/sessionController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", passport.authenticate("jwt", { session: false }), current);

export default router;
