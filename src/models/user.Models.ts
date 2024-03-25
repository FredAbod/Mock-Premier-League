import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, default: "user" }, 
},{
    versionKey: false,
    timestamps: true
  });

export const UserModel = mongoose.model<User>("User", userSchema);
