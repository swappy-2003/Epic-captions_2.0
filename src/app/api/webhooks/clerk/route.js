import { Webhook } from "svix";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" }); // <-- FIXED
    }

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    const headers = req.headers;

    try {
        const wh = new Webhook(WEBHOOK_SECRET);
        const payload = wh.verify(JSON.stringify(req.body), headers);

        console.log("Received Webhook Event:", payload);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Webhook verification failed", error);
        res.status(400).json({ error: "Invalid Webhook Signature" });
    }
}
