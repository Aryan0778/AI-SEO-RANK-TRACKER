import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import dns from 'dns';
import authRouter from './routes/authRoutes.js';
import rankRouter from './routes/rankRoutes.js';
import analysisRouter from './routes/analysisRoutes.js';
import { startRankTrackingCron } from './cron/rankTrackingCron.js';
// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB()
const app = express()

const allowedOrigins = [
    'https://ai-seo-rank-tracker-yio4.vercel.app', // Your Vercel frontend domain
    'http://localhost:5173'                        // Your local development domain
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by CORS policy'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())


app.get('/',(req,res)=>res.send("Server is running"))
app.use("/api/auth", authRouter)
app.use("/api/rank", rankRouter)
app.use('/api/analysis',analysisRouter)

//Start cron jobs
startRankTrackingCron();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))