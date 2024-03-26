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
router.get('/find/:link',  findFixtureByLink);

// Find all fixtures
router.get('/findAll', findAllFixtures);

// Search fixtures by team name
router.get('/findByTeamName',  searchFixturesByTeam);

// Search fixtures by date range
router.get('/findByDateRange', searchFixturesByDateRange);

// Search fixtures by status
router.get('/searchByStatus',  searchFixturesByStatus);

// View completed fixtures
router.get('/viewCompleted',  completedFixtures);

// View pending fixtures
router.get('/viewPending',  viewPendingFixtures);

// Delete fixture
router.delete('/delete/:link', isAuthenticated, deleteFixture);

export default router;
