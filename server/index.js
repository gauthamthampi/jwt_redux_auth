import express from "express";
const app = express()
import cors from "cors"
import { fileURLToPath } from 'url';
import path from "path"
import userRouter from "./router/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv"

app.use(express.json())
dotenv.config()

const connect = mongoose.connect('mongodb://localhost:27017/JWT_Auth')

connect.then(()=>{
    console.log("User Database connected successfully");
}).catch((err)=>{
    console.log("Error connectiong with userdb"+err);
})

app.use(cors());
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(userRouter)


// app.use(express.static(path.join(__dirname, 'build')));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", 'index.html'))
// })

app.get("/test",(req,res)=>{
    const data = {
        message: 'Hello from the backend!',
        timestamp: new Date().toISOString()
      };
      res.json(data);
})

app.listen(3001)
console.log("Server started on http://localhost:3001");
