"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fixtures_Controller_1 = require("../controllers/fixtures.Controller");
const isAuthenticated_1 = require("../utils/middleware/isAuthenticated");
const router = express_1.default.Router();
// Add fixture
router.post('/add', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.addFixture);
// Mark fixture as completed
router.put('/completed/:link', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.completeFixture);
// Edit fixture result
router.put('/edit/:link', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.editFixtureResult);
// Find fixture by link
router.get('/find/:link', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.findFixtureByLink);
// Find all fixtures
router.get('/findAll', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.findAllFixtures);
// Search fixtures by team name
router.get('/findByTeamName', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.searchFixturesByTeam);
// Search fixtures by date range
router.get('/findByDateRange', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.searchFixturesByDateRange);
// Search fixtures by status
router.get('/searchByStatus', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.searchFixturesByStatus);
// View completed fixtures
router.get('/viewCompleted', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.completedFixtures);
// View pending fixtures
router.get('/viewPending', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.viewPendingFixtures);
// Delete fixture
router.delete('/delete/:link', isAuthenticated_1.isAuthenticated, fixtures_Controller_1.deleteFixture);
exports.default = router;
