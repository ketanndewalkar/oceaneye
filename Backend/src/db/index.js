import mongoose from "mongoose";

const connectdb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅ Mongodb connected")
    } catch (error) {  
        console.error("Mongodb connection failed")
        console.error("Error message:", error.message);

        process.exit(1)
    }
}
// Global toJSON plugin to format createdAt and updatedAt(Indian Standard Time) in all schemas
mongoose.plugin((schema) => {
  schema.set("toJSON", {
    transform: (doc, ret) => {
      if (ret.createdAt) {
        ret.createdAt = new Date(ret.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
      }
      if (ret.updatedAt) {
        ret.updatedAt = new Date(ret.updatedAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
      }
      return ret;
    },
  });
});
export default connectdb