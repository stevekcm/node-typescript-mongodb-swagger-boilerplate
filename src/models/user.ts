import mongoose from "mongoose";

export interface UserDoc extends UserPoJo, mongoose.Document {
  // instance methods go here
}

export type UserModel = mongoose.Model<UserDoc>;

export type UserDocLean = mongoose.LeanDocument<UserDoc>;

export interface UserJWTPayLoad {
  _id: mongoose.Types.ObjectId;
  email: string;
}

export interface UserPoJo {
  email: string;
  password: string;
  createAt?: Date;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<UserDoc, UserModel>("User", userSchema);
