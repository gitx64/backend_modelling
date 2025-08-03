import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./db/index.js";
import express from "express";


const app = express();


connectDB()
.then(() => {
    app.on('error', (err) => {
        console.log("Error: Connected server but now : ",err)
        throw err;
    })
    app.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`))
})
.catch((err) => console.log("Mongodb Connection Failed !!", err))












































// ;(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//     app.on("error", (error) => {
//       console.log("Error: ",error);
//     })
    
//     app.listen(process.env.PORT, () => console.log("Server Connected and listening at ", process.env.PORT))

//   } catch (error) {
//     console.log(error)
//   }
// })(); iffi structure