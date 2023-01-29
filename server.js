import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from 'dotenv'

import userRoutes from "./routes/user.js"
import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/answer.js";

const app = express()
dotenv.config()
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors({origin: "https://stackoverflow-clone-12.netlify.app"}))

app.get("/", (req, res) => {
    res.send("This is stack-overflow API")
});

app.use('/user', userRoutes)
app.use('/question', questionRoutes)
app.use('/answer', answerRoutes)

const PORT = process.env.PORT

const CONNECTION_URL = process.env.MONGODB_URI

mongoose.connect(CONNECTION_URL , {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    }))
    .catch(err=> console.log(err.message))