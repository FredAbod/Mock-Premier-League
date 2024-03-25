"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fixtures_Controller_1 = require("../controllers/fixtures.Controller");
const router = express_1.default.Router();
router.post('/add', fixtures_Controller_1.addFixture);
router.put('/completed/:link', fixtures_Controller_1.completeFixture);
router.put('/edit/:link', fixtures_Controller_1.editFixtureResult);
router.get('/find/:link', fixtures_Controller_1.findFixtureByLink);
router.get('/findAll', fixtures_Controller_1.findAllFixtures);
router.delete('/delete/:link', fixtures_Controller_1.deleteFixture);
exports.default = router;
