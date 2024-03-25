import express, { Request, Response } from "express";
import { addTeam } from "../controllers/team.Controller";
import upload from "../image/multer";

const router = express.Router();

// Add A Team
router.post("/add", upload.single("logo"), addTeam);

export default router;
