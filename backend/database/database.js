import mongoose from "mongoose";



export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName: "Ecommerce",
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        // You can add more specific error handling here if needed
    }
};