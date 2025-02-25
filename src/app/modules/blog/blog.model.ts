import { model, Model, Schema } from "mongoose";
import { BlogType } from "./blog.interface";

const BlogSchema: Schema<BlogType> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const BlogModel: Model<BlogType> = model<BlogType>("Blog", BlogSchema);
