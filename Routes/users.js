/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 *
 * /api/users:
 *   get:
 *     summary: Get list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User object
 *       404:
 *         description: User not found
 */
import { Router } from "express";
import { getUsers, getUserById } from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
