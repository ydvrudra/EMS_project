import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import deptRoutes from './routes/deptRoutes.js';
import empRoutes from './routes/empRoutes.js';


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/department",deptRoutes);
app.use('/api/employee', empRoutes);


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
