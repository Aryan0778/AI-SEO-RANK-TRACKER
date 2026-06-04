import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import dns from 'dns';
import authRouter from './Routes/authRoutes.js';
import rankRouter from './routes/rankRoutes.js';
// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>res.send("Server is running"))
app.use("/api/auth", authRouter)
app.use("/api/rank", rankRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))