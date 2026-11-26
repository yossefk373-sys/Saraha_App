import mongoose from "mongoose"
import { URL_DB } from "../config/config.js";
const connectDB = async () => {
    try {
        await mongoose.connect(URL_DB, { serverSelectionTimeoutMS: 5000 });
        console.log("Database connect success ✔️");
    } catch (error) {
        console.log("Database fail to connect ❌", error.message);
    }
};
    export default connectDB;
