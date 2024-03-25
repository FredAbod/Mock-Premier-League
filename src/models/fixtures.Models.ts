import mongoose, { Document, Schema, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface Fixture extends Document {
  homeTeam: String;
  awayTeam: String;
  startTime: Date;
  location: string;
  status: string;
  result?: { homeTeamScore: number; awayTeamScore: number };
  link: string;
}

const fixtureSchema = new Schema<Fixture>({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String,  required: true },
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
    default: () => uuidv4(), // Generate a unique link using uuidv4
  },
},{
  versionKey: false,
  timestamps: true
});

export const FixtureModel = mongoose.model<Fixture>('Fixture', fixtureSchema);
