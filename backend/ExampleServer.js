import * as path from 'path';
import { connectToServer } from './ExampleConnect.js';
import express from 'express';
import cors from 'cors';
import expressRouter from './ExampleRoutes.js';
import dotenv from 'dotenv';

const app = express()
const PORT = 3000   

const __dirname = path.resolve()
console.log(`Current directory: ${__dirname}`)

dotenv.config({ path: path.resolve(__dirname, '.env') })

app.use(cors())
app.use(express.json())
app.use("/pets", expressRouter)

console.log(`Directory: ${path.resolve(__dirname, '.env')}`)
console.log(`Environment: ${process.env.NODE_ENV}`)

if (process.env.NODE_ENV == "production") {
    console.log("Production mode enabled")
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, async () =>  {
    console.log(`🚀 Server is starting on port ${PORT}`)
    const dbConnected = await connectToServer()
    if (dbConnected) {
        console.log(`✅ Server is running on port ${PORT} with database connection`)
    } else {
        console.log(`⚠️ Server is running on port ${PORT} but database connection failed`)
    }
})