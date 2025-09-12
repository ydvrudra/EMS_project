import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import deptRoutes from './routes/deptRoutes.js';
import empRoutes from './routes/empRoutes.js';
import salaryRoutes from './routes/salaryRoutes.js'
import leaveRoutes from './routes/leaveRoute.js';
import settingRoutes from './routes/settingRoutes.js'
//import { handleError } from './middleware/errorHandler.js';


const app = express();
dotenv.config();
app.use(cors());
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
