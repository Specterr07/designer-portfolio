import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import projectRoutes from "./routes/projectRoutes.js"
import authRoutes from './routes/auth.js'; // <--- Add this
import authMiddleware from './middleware/authMiddleware.js'; // <--- Add this

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/projects', projectRoutes)

app.get('/', (req, res) => {
    res.send('Api is running smoothly....')
});


const PORT = process.env.PORT || 8000;
app.use('/api/auth', authRoutes); // <--- This enables /api/auth/login
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB Work!
async function connectDB(params) {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();


// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB connected!"))
//     .catch(err => console.log(err));

