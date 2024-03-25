"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixtureModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const uuid_1 = require("uuid");
const fixtureSchema = new mongoose_1.Schema({
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    location: { type: String, required: true },
    startTime: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    result: {
        homeTeamScore: { type: Number, default: 0 },
        awayTeamScore: { type: Number, default: 0 },
    },
    link: {
        type: String,
        required: true,
        unique: true,
        default: () => (0, uuid_1.v4)(), // Generate a unique link using uuidv4
    },
}, {
    versionKey: false,
    timestamps: true
});
exports.FixtureModel = mongoose_1.default.model('Fixture', fixtureSchema);
