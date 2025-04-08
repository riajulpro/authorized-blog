import bcrypt from "bcrypt";
import { model, Model, Schema } from "mongoose";

import { UserType } from "./user.interface";

const UserSchema: Schema<UserType> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  const saltedRounds = 10;

  user.password = await bcrypt.hash(user.password, saltedRounds);

  next();
});

export const UserModel: Model<UserType> = model<UserType>("User", UserSchema);
