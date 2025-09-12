import mongoose from "mongoose";
import User from "./src/models/user.models.js";
import dotenv from "dotenv"

dotenv.config()


async function fixUserIndexes() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const indexes = await mongoose.connection.db.collection("users").indexes();
    console.log("Current indexes:", indexes);

    // Drop unwanted indexes if they exist
    const dropIndexes = ["Email_1", "password_1"];
    for (const idx of dropIndexes) {
      const exists = indexes.find((i) => i.name === idx);
      if (exists) {
        await mongoose.connection.db.collection("users").dropIndex(idx);
        console.log(`Dropped index: ${idx}`);
      }
    }

    // Ensure correct unique index on email
    await mongoose.connection.db.collection("users").createIndex(
      { email: 1 },
      { unique: true }
    );
    console.log("Ensured unique index on email");

    console.log("✅ Indexes fixed successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error fixing indexes:", err);
    process.exit(1);
  }
}

fixUserIndexes();
