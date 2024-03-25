"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const team_Controller_1 = require("../controllers/team.Controller");
const multer_1 = __importDefault(require("../image/multer"));
const router = express_1.default.Router();
// Add A Team
router.post("/add", multer_1.default.single("logo"), team_Controller_1.addTeam);
exports.default = router;
