import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectToDB from "./config/_mongodb.js";
import Routes from "./routes/route.js";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
ConnectToDB();

app.use("/",Routes);

app.listen(PORT,()=>{
    console.log(`Server connected to port ${PORT}`);
})
