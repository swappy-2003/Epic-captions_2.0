import { MongoClient } from "mongodb";

const uri = process.env.MongoDB_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect().then(conn => {
    console.log("Connected to MongoDB");
    return conn;
  }).catch(error => {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  });
}

clientPromise = global._mongoClientPromise;
export default clientPromise;
