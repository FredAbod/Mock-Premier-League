import express, { Request, Response } from 'express';
import { addFixture, completeFixture, deleteFixture, editFixtureResult, findAllFixtures, findFixtureByLink } from '../controllers/fixtures.Controller';
const router = express.Router();

router.post('/add', addFixture)
router.put('/completed/:link', completeFixture)
router.put('/edit/:link', editFixtureResult)
router.get('/find/:link', findFixtureByLink)
router.get('/findAll', findAllFixtures)
router.delete('/delete/:link', deleteFixture)

export default router;
