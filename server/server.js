import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import projectRoutes from "./routes/projectRoutes.js"
import authRoutes from './routes/auth.js'; // <--- Add this
import authMiddleware from './middleware/authMiddleware.js'; // <--- Add this

const allowedOrigins = [
  'http://localhost:5173',          // 1. Your Local Development
  'https://design.vpcodes.in',      // 2. Your Live Production Site
  'https://www.design.vpcodes.in'   // 3. (Optional) Safety net for www
];

const corsOptions = {
    origin: function (requestOrigin, callback) {
        // 1. requestOrigin: The URL trying to access your backend
        // 2. callback: A function you MUST call to tell Express "Yes" or "No"

        // Allow requests with no origin (like Postman or Mobile Apps)
        if (!requestOrigin) {
        return callback(null, true);
        }

        // Check if the incoming URL is in our allowed list
        if (allowedOrigins.indexOf(requestOrigin) !== -1) {
        // SUCCESS: No error (null), and allow access (true)
        return callback(null, true);
        } else {
        // FAILURE: Pass an Error object. Express will catch this and block the request.
        return callback(new Error('Not allowed by CORS'));
        } 
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
};

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/projects', projectRoutes)
app.use('/api/auth', authRoutes); // <--- This enables /api/auth/login

app.get('/', (req, res) => {
    res.send('Api is running smoothly....')
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB Work!
async function connectDB() {
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

