import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    clerk: { type: String, required: true },
    clerkId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String, required: true },
    image_url: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
