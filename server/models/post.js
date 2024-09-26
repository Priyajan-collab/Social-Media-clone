import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    content: String,
    file: String,
    author: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
);
const postModel = model("post", PostSchema);
export default postModel;
