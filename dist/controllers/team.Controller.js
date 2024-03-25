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
exports.addTeam = void 0;
const response_1 = require("../utils/lib/response");
const teams_Models_1 = require("../models/teams.Models");
const cloudinary_1 = __importDefault(require("../image/cloudinary"));
const addTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
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
        // Create new team document with uploaded logo URL
        const newTeam = new teams_Models_1.TeamModel({
            name,
            logo: result.secure_url,
        });
        // Save the new team to the database
        yield newTeam.save();
        // Send success response
        return (0, response_1.successResMsg)(res, 201, {
            success: true,
            user: newTeam,
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
