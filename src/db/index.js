import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from 'dotenv'
dotenv.config({path: './env'})
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Mongodb Connected Successfully || DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Mongodb Connection error: ",error)
        process.exit(1)
    }
}

export default connectDB;