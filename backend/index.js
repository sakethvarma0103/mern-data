import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
import userRoute from './routes/userRoutes.js'

const app=express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.URI)
.then(()=>
{
    app.listen(process.env.PORT,()=>{
        console.log("Listening to port 5000");
    });
    console.log("Database connected sucessfully");
}
)
.catch((err)=>console.log(err));

app.use(userRoute);