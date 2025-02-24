import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  metadata: { type: Object, default: {} },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
