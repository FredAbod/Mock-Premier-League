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
exports.searchFixturesByLocation = exports.searchFixturesByStatus = exports.searchFixturesByTeam = exports.searchFixturesByDateRange = exports.viewPendingFixtures = exports.completedFixtures = exports.deleteFixture = exports.findAllFixtures = exports.findFixtureByLink = exports.editFixtureResult = exports.completeFixture = exports.addFixture = void 0;
const response_1 = require("../utils/lib/response");
const teams_Models_1 = require("../models/teams.Models");
const fixtures_Models_1 = require("../models/fixtures.Models");
const admin_Models_1 = require("../models/admin.Models");
const addFixture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { homeTeam, awayTeam, startTime, location } = req.body;
        const user = req.user; // Assert req.user as User type
        // Find the admin document by user ID
        const admin = yield admin_Models_1.AdminModel.findById(user.userId);
        // Check if the admin document exists and has the role 'admin'
        if (!admin || admin.role !== "admin") {
            return (0, response_1.errorResMsg)(res, 400, "You're Not Authorized");
        }
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
        const user = req.user; // Assert req.user as User type
        // Find the admin document by user ID
        const admin = yield admin_Models_1.AdminModel.findById(user.userId);
        // Check if the admin document exists and has the role 'admin'
        if (!admin || admin.role !== "admin") {
            return (0, response_1.errorResMsg)(res, 400, "You're Not Authorized");
        }
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
        const user = req.user; // Assert req.user as User type
        // Find the admin document by user ID
        const admin = yield admin_Models_1.AdminModel.findById(user.userId);
        // Check if the admin document exists and has the role 'admin'
        if (!admin || admin.role !== "admin") {
            return (0, response_1.errorResMsg)(res, 400, "You're Not Authorized");
        }
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
const completedFixtures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completedFixtures = yield fixtures_Models_1.FixtureModel.find({ status: "completed" });
        return (0, response_1.successResMsg)(res, 200, {
            success: true,
            data: completedFixtures,
            message: "Completed fixtures retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error retrieving completed fixtures:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.completedFixtures = completedFixtures;
const viewPendingFixtures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pendingFixtures = yield fixtures_Models_1.FixtureModel.find({ status: 'pending' });
        return (0, response_1.successResMsg)(res, 200, {
            success: true,
            data: pendingFixtures,
            message: "Pending fixtures retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error retrieving pending fixtures:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.viewPendingFixtures = viewPendingFixtures;
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
// Controller to search fixtures by team names
const searchFixturesByTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamName } = req.params;
        // Search for fixtures where either home team or away team matches the provided team name
        const fixtures = yield fixtures_Models_1.FixtureModel.find({
            $or: [{ homeTeam: teamName }, { awayTeam: teamName }],
        });
        return (0, response_1.successResMsg)(res, 200, { fixtures });
    }
    catch (error) {
        console.error("Error searching fixtures by team name:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.searchFixturesByTeam = searchFixturesByTeam;
// Controller to search fixtures by date range
const searchFixturesByDateRange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        // Search for fixtures within the specified date range
        const fixtures = yield fixtures_Models_1.FixtureModel.find({
            startTime: { $gte: new Date(startDate), $lte: new Date(endDate) },
        });
        return (0, response_1.successResMsg)(res, 200, { fixtures });
    }
    catch (error) {
        console.error("Error searching fixtures by date range:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.searchFixturesByDateRange = searchFixturesByDateRange;
// Controller to search fixtures by location
const searchFixturesByLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location } = req.params;
        // Search for fixtures based on the provided location
        const fixtures = yield fixtures_Models_1.FixtureModel.find({ location });
        return (0, response_1.successResMsg)(res, 200, { fixtures });
    }
    catch (error) {
        console.error("Error searching fixtures by location:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.searchFixturesByLocation = searchFixturesByLocation;
// Controller to search fixtures by status
const searchFixturesByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.params;
        // Search for fixtures based on the provided status
        const fixtures = yield fixtures_Models_1.FixtureModel.find({ status });
        return (0, response_1.successResMsg)(res, 200, { fixtures });
    }
    catch (error) {
        console.error("Error searching fixtures by status:", error);
        return (0, response_1.errorResMsg)(res, 500, "Internal server error");
    }
});
exports.searchFixturesByStatus = searchFixturesByStatus;
