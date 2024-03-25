import express, { Request, Response } from 'express';
import { addFixture, completeFixture, deleteFixture, editFixtureResult, findAllFixtures, findFixtureByLink, completedFixtures, viewPendingFixtures, searchFixturesByTeam, searchFixturesByDateRange, searchFixturesByStatus } from '../controllers/fixtures.Controller';
import { isAuthenticated } from '../utils/middleware/isAuthenticated';

const router = express.Router();

// Add fixture
router.post('/add', isAuthenticated, addFixture);

// Mark fixture as completed
router.put('/completed/:link', isAuthenticated, completeFixture);

// Edit fixture result
router.put('/edit/:link', isAuthenticated, editFixtureResult);

// Find fixture by link
router.get('/find/:link', isAuthenticated, findFixtureByLink);

// Find all fixtures
router.get('/findAll', isAuthenticated, findAllFixtures);

// Search fixtures by team name
router.get('/findByTeamName', isAuthenticated, searchFixturesByTeam);

// Search fixtures by date range
router.get('/findByDateRange', isAuthenticated, searchFixturesByDateRange);

// Search fixtures by status
router.get('/searchByStatus', isAuthenticated, searchFixturesByStatus);

// View completed fixtures
router.get('/viewCompleted', isAuthenticated, completedFixtures);

// View pending fixtures
router.get('/viewPending', isAuthenticated, viewPendingFixtures);

// Delete fixture
router.delete('/delete/:link', isAuthenticated, deleteFixture);

export default router;
