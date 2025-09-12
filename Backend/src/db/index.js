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
export default connectdb