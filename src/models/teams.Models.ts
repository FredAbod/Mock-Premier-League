import mongoose, { Document, Schema, Types } from "mongoose";

export interface Team extends Document {
  name: string;
  logo: string;
  fixtures: Types.ObjectId[]; // Array of fixture IDs
}

const teamSchema = new Schema<Team>({
  name: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  fixtures: [{ type: Schema.Types.ObjectId, ref: 'Fixture' }], // Array of fixture IDs referencing the Fixture model
},{
  versionKey: false,
  timestamps: true
});

export const TeamModel = mongoose.model<Team>("Team", teamSchema);
