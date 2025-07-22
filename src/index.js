import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./db/index.js";
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
// })();

connectDB();