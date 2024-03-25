"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const team_Controller_1 = require("../controllers/team.Controller");
const multer_1 = __importDefault(require("../image/multer"));
const isAuthenticated_1 = require("../utils/middleware/isAuthenticated");
const router = express_1.default.Router();
// Add A Team
router.post("/add", isAuthenticated_1.isAuthenticated, multer_1.default.single("logo"), team_Controller_1.addTeam);
router.put("/addPlayers/:id", isAuthenticated_1.isAuthenticated, team_Controller_1.addPlayersToTeam);
router.put("/updateTeam/:id", isAuthenticated_1.isAuthenticated, team_Controller_1.updateTeamDetails);
router.delete("/delete", isAuthenticated_1.isAuthenticated, team_Controller_1.deleteTeam);
router.delete("/deletePlayer/:id", isAuthenticated_1.isAuthenticated, team_Controller_1.deletePlayerFromTeam);
exports.default = router;
