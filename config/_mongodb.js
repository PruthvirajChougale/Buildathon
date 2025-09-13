import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MongoUri = process.env.MONGO_URL;

const ConnectToDB =async () =>{
    try{
        await mongoose.connect(MongoUri);
          console.log("Connected to MongoDB successfully");
    }
    catch(error){
        console.log(error);
    }
}

export default ConnectToDB;