import * as path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'

const __dirname = path.resolve()
dotenv.config({ path: path.resolve(__dirname, '.env') })

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database

export const connectToServer = async () => {
    try {
      console.log("🔗 Attempting to connect to MongoDB...");
      console.log("📊 Database name:", process.env.DATABASE_NAME);
      console.log("🌐 Atlas URI:", process.env.ATLAS_URI ? "✅ Set" : "❌ Missing");
      
      // Connect the client to the server
      await client.connect();
      console.log("✅ MongoDB client connected successfully!");
      
      // Verify connection by pinging the database
      await client.db(process.env.DATABASE_NAME).command({ ping: 1 });
      console.log("✅ MongoDB cluster connection established successfully!");

      // Set the database reference
      database = client.db(process.env.DATABASE_NAME);
      console.log(`✅ Connection to database "${process.env.DATABASE_NAME}" established successfully!`);
      
      // Test the database connection by listing collections
      const collections = await database.listCollections().toArray();
      console.log(`📋 Available collections:`, collections.map(c => c.name));
      
      return true; // Return success status
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err);
      console.error("🔍 Error details:", err.message);
      return false; // Return failure status
    }
};

export const getDb = () => {
  return database
}
