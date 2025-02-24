import { Webhook } from "svix";
import { headers } from "next/headers";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  // Clerk Webhook Signing Secret from .env
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response("Error: SIGNING_SECRET is missing", { status: 500 });
  }

  // Connect to MongoDB
  await connectDB();

  // Initialize Svix Webhook verification
  const wh = new Webhook(WEBHOOK_SECRET);

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  // Get request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let event;

  // Verify Clerk Webhook
  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Error: Invalid Webhook Signature", { status: 400 });
  }

  // Extract event data
  const { id, type, data } = event;
  console.log(`Received webhook: ${type} for user ${id}`);

  // If a new user is created, store metadata in MongoDB
  if (type === "user.created") {
    try {
      const newUser = new User({
        clerkId: data.id,
        email: data.email_addresses[0].email_address, // Extract email
        name: `${data.first_name} ${data.last_name}`,
        metadata: data.public_metadata || {},
      });

      await newUser.save();
      console.log("New user saved to DB:", newUser);
    } catch (error) {
      console.error("Error saving user:", error);
      return new Response("Error saving user", { status: 500 });
      return NextResponse.json({ message: "New user created", user: newUser });
      }
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
