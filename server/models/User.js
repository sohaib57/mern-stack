import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: ["firstName field is required"] },
    lastName: { type: String, required: ["lastName field is required"] },
    email: { type: String, required: ["email field is required"] },
    password: { type: String, required: ["password field is required"] },
  },
  { timestamps: true }
);

export default new mongoose.model("User", userSchema);
