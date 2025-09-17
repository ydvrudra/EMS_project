import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import deptRoutes from './routes/deptRoutes.js';
import empRoutes from './routes/empRoutes.js';
import salaryRoutes from './routes/salaryRoutes.js'
import leaveRoutes from './routes/leaveRoute.js';
import settingRoutes from './routes/settingRoutes.js';
import DashboardRoutes from './routes/dashboard.js'
//import { handleError } from './middleware/errorHandler.js';


const app = express();
dotenv.config();

const allowedOrigins = [
    'https://ems-qic8.onrender.com',
     'http://localhost:5173', 
     undefined
]; 

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.static('public/uploads'))
//app.use(handleError);


// routes
app.use("/api/users", userRoutes);
app.use("/api/department",deptRoutes);
app.use('/api/employee', empRoutes);
app.use('/api/salary',salaryRoutes );
app.use('/api/leave',leaveRoutes );
app.use('/api/setting', settingRoutes);
app.use('/api/dashboard',DashboardRoutes);


//mongoDB Connection 
const PORT = process.env.PORT || 5001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI,{ 
        useNewUrlParser: true,
        useUnifiedTopology:true
        });
        console.log("✅ Connected to MongoDB");
} catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
}

app.listen(PORT, () => {
    console.log(`🚀 server is running on port ${PORT}`);
});
