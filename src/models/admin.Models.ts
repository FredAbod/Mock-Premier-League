import mongoose, { Document, Schema } from "mongoose";

export interface Admin extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

const adminSchema = new Schema<Admin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, default: "admin" },
},{
  versionKey: false,
  timestamps: true
});

export const AdminModel = mongoose.model<Admin>("Admin", adminSchema);
