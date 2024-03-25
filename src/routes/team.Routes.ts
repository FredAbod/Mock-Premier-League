import express, { Request, Response } from "express";
import { addPlayersToTeam, addTeam, deletePlayerFromTeam, deleteTeam, updateTeamDetails } from "../controllers/team.Controller";
import upload from "../image/multer";
import { isAuthenticated } from "../utils/middleware/isAuthenticated";

const router = express.Router();

// Add a team
router.post("/add", isAuthenticated, upload.single("logo"), addTeam);

// Add players to a team
router.put("/addPlayers/:id", isAuthenticated, addPlayersToTeam);

// Update team details
router.put("/updateTeam/:id", isAuthenticated, updateTeamDetails);

// Delete a team
router.delete("/delete", isAuthenticated, deleteTeam);

// Delete a player from a team
router.delete("/deletePlayer/:id", isAuthenticated, deletePlayerFromTeam);

export default router;
