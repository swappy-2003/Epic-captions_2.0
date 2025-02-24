import mongoose from "mongoose";

const MongoDB_URI = process.env.MongoDB_URI;

if (!MongoDB_URI) {
  throw new Error("Please define MONGODB_URL in your .env file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MongoDB_URI, {
      dbName: "clerkauthv5",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
