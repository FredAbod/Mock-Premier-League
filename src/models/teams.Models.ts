import mongoose, { Document, Schema, Types } from "mongoose";

export interface Team extends Document {
    name: string;
    logo: string;
    coach: string;
    fixtures: Types.ObjectId[]; // Array of fixture IDs
    players: string[]; // Array of player names
}

const teamSchema = new Schema<Team>({
    name: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    coach: { type: String },
    fixtures: [{ type: Schema.Types.ObjectId, ref: 'Fixture' }], // Array of fixture IDs referencing the Fixture model
    players: [{ type: String }] // Array of player names as strings
}, {
    versionKey: false,
    timestamps: true
});

export const TeamModel = mongoose.model<Team>("Team", teamSchema);
