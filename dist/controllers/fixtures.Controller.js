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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixture = exports.findAllFixtures = exports.findFixtureByLink = exports.editFixtureResult = exports.completeFixture = exports.addFixture = void 0;
const response_1 = require("../utils/lib/response");
const teams_Models_1 = require("../models/teams.Models");
const fixtures_Models_1 = require("../models/fixtures.Models");
const addFixture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { homeTeam, awayTeam, startTime, location } = req.body;
        // Check if all required fields are provided
        if (!homeTeam || !awayTeam || !startTime || !location) {
            return (0, response_1.errorResMsg)(res, 400, "All fields are required");
        }
        // Check if both home team and away team exist
        const checkExistingHomeTeam = yield teams_Models_1.TeamModel.findOne({ name: homeTeam });
        const checkExistingAwayTeam = yield teams_Models_1.TeamModel.findOne({ name: awayTeam });
        if (!checkExistingHomeTeam || !checkExistingAwayTeam) {
            return (0, response_1.errorResMsg)(res, 400, "Both home team and away team must exist");
        }
        // Create a new fixture
        const newFixture = new fixtures_Models_1.FixtureModel({
            homeTeam,
            awayTeam,
            startTime,
            location,
        });
        // Save the new fixture
        yield newFixture.save();
        // Add the new fixture ID to the homeTeam and awayTeam documents
        checkExistingHomeTeam.fixtures.push(newFixture._id);
        checkExistingAwayTeam.fixtures.push(newFixture._id);
        yield checkExistingHomeTeam.save();
        yield checkExistingAwayTeam.save();
        return (0, response_1.successResMsg)(res, 201, {
            success: true,
            data: newFixture,
            message: "Fixture created successfully",
        });
    }
    catch (error) {
        console.error("Error in Adding Fixtures:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.addFixture = addFixture;
const completeFixture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link } = req.params;
        const fixture = yield fixtures_Models_1.FixtureModel.findOneAndUpdate({ link }, { status: "completed" }, { new: true });
        if (!fixture) {
            return (0, response_1.errorResMsg)(res, 404, "Fixture not found");
        }
        return (0, response_1.successResMsg)(res, 200, {
            success: true,
            data: fixture,
            message: "Fixture status changed to completed",
        });
    }
    catch (error) {
        console.error("Error completing fixture:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.completeFixture = completeFixture;
const editFixtureResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link } = req.params;
        const { homeTeamScore, awayTeamScore } = req.body;
        const fixture = yield fixtures_Models_1.FixtureModel.findOneAndUpdate({ link }, { result: { homeTeamScore, awayTeamScore } }, { new: true });
        if (!fixture) {
            return (0, response_1.errorResMsg)(res, 404, "Fixture not found");
        }
        return (0, response_1.successResMsg)(res, 200, {
            success: true,
            data: fixture,
            message: "Fixture result updated successfully",
        });
    }
    catch (error) {
        console.error("Error editing fixture result:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.editFixtureResult = editFixtureResult;
const findFixtureByLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link } = req.params;
        const newFixture = yield fixtures_Models_1.FixtureModel.findOne({ link });
        if (!newFixture) {
            return (0, response_1.errorResMsg)(res, 404, "Fixture not found");
        }
        return (0, response_1.successResMsg)(res, 200, {
            success: true,
            data: newFixture,
            message: "Fixture found",
        });
    }
    catch (error) {
        console.error("Error finding fixture by link:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.findFixtureByLink = findFixtureByLink;
const findAllFixtures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fixtures = yield fixtures_Models_1.FixtureModel.find();
        (0, response_1.successResMsg)(res, 200, {
            success: true,
            data: fixtures,
            message: "All fixtures retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error finding all fixtures:", error);
        (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.findAllFixtures = findAllFixtures;
const deleteFixture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link } = req.params;
        const deletedFixture = yield fixtures_Models_1.FixtureModel.findOneAndDelete({ link });
        if (!deletedFixture) {
            return (0, response_1.errorResMsg)(res, 404, "Fixture not found");
        }
        return (0, response_1.successResMsg)(res, 200, {
            success: true,
            data: deletedFixture,
            message: "Fixture deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting fixture:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.deleteFixture = deleteFixture;
