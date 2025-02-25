import { Webhook } from "svix"; // Clerk uses Svix for webhooks
import User from "../../../../../modals/user.modal";
import connectToDatabase from "./.././../../../libs/db";

export default async function handler(req, res) {
  await connectToDatabase();

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ message: "Missing Clerk Webhook Secret" });
  }

  // Verify incoming webhook
  const headers = req.headers;
  const payload = JSON.stringify(req.body);
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ message: "Invalid request headers" });
  }

  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    const { type, data } = evt;

    if (type === "user.created") {
      const userData = {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
      };

      await User.create(userData);
      console.log("User Created in DB:", userData);
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkId: data.id });
      console.log("User Deleted from DB:", data.id);
    }

    res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Webhook verification failed:", error);
    res.status(400).json({ message: "Webhook verification failed" });
  }
}

export const config = {
  api: {
    bodyParser: false, // Clerk sends raw body
  },
};
