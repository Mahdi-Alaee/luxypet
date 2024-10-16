import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = models.user || model("user", UserSchema);
