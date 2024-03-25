"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamDetails = exports.deletePlayerFromTeam = exports.addPlayersToTeam = exports.deleteTeam = exports.addTeam = void 0;
const response_1 = require("../utils/lib/response");
const teams_Models_1 = require("../models/teams.Models");
const cloudinary_1 = __importDefault(require("../image/cloudinary"));
const admin_Models_1 = require("../models/admin.Models");
const addTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, coach } = req.body;
        const user = req.user; // Assert req.user as User type
        // Find the admin document by user ID
        const admin = yield admin_Models_1.AdminModel.findById(user.userId);
        // Check if the admin document exists and has the role 'admin'
        if (!admin || admin.role !== "admin") {
            return (0, response_1.errorResMsg)(res, 400, "You're Not Authorized");
        }
        // Check if required fields are provided
        if (!name || !req.file) {
            return (0, response_1.errorResMsg)(res, 400, "Name and Logo are required");
        }
        // Check if team already exists
        const existingTeam = yield teams_Models_1.TeamModel.findOne({ name });
        if (existingTeam) {
            return (0, response_1.errorResMsg)(res, 400, "Team already exists");
        }
        // Upload the logo to cloudinary
        const result = yield cloudinary_1.default.uploader.upload(req.file.path);
        // Create new team document with uploaded logo URL and coach
        const newTeam = new teams_Models_1.TeamModel({
            name,
            logo: result.secure_url,
            coach,
        });
        // Save the new team to the database
        yield newTeam.save();
        // Send success response
        return (0, response_1.successResMsg)(res, 201, {
            success: true,
            team: newTeam,
            message: "Team created successfully",
        });
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error("Error adding team:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.addTeam = addTeam;
const addPlayersToTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { players } = req.body;
        const teamId = req.params.id; // Access the team ID directly
        // Find the team by ID
        const team = yield teams_Models_1.TeamModel.findById(teamId);
        if (!team) {
            return (0, response_1.errorResMsg)(res, 404, "Team not found");
        }
        // Add players to the team
        team.players.push(...players);
        // Save the updated team
        yield team.save();
        return (0, response_1.successResMsg)(res, 200, {
            success: true,
            message: "Players added to the team successfully",
            team: team,
        });
    }
    catch (error) {
        console.error("Error adding players to team:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.addPlayersToTeam = addPlayersToTeam;
const updateTeamDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, logo } = req.body;
        const teamId = req.params.id;
        // Find the team by ID
        const team = yield teams_Models_1.TeamModel.findById(teamId);
        if (!team) {
            return (0, response_1.errorResMsg)(res, 404, "Team not found");
        }
        // Update team details
        if (name)
            team.name = name;
        if (logo)
            team.logo = logo;
        // Save the updated team
        yield team.save();
        return (0, response_1.successResMsg)(res, 200, {
            success: true,
            message: "Team details updated successfully",
            team: team,
        });
    }
    catch (error) {
        console.error("Error updating team details:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.updateTeamDetails = updateTeamDetails;
const deletePlayerFromTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerName } = req.body;
        const teamId = req.params.id;
        // Find the team by ID
        const team = yield teams_Models_1.TeamModel.findById(teamId);
        if (!team) {
            return (0, response_1.errorResMsg)(res, 404, "Team not found");
        }
        // Check if the player exists in the team
        const playerIndex = team.players.indexOf(playerName);
        if (playerIndex === -1) {
            return (0, response_1.errorResMsg)(res, 404, "Player not found in the team");
        }
        // Remove the player from the team's array
        team.players.splice(playerIndex, 1);
        // Save the updated team
        yield team.save();
        return (0, response_1.successResMsg)(res, 200, {
            success: true,
            message: "Player removed from the team successfully",
            team: team,
        });
    }
    catch (error) {
        console.error("Error deleting player from team:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.deletePlayerFromTeam = deletePlayerFromTeam;
const deleteTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamId = req.params.id; // Access the team ID directly
        // Delete the team by ID
        const deletedTeam = yield teams_Models_1.TeamModel.findByIdAndDelete(teamId);
        if (!deletedTeam) {
            return (0, response_1.errorResMsg)(res, 404, "Team not found");
        }
        return (0, response_1.successResMsg)(res, 200, {
            success: true,
            message: "Team deleted successfully",
            team: deletedTeam,
        });
    }
    catch (error) {
        console.error("Error deleting team:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.deleteTeam = deleteTeam;
