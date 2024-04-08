import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { auth } from './middlewares/auth.js';
import { authRouter } from './routes/auth.js';
import { contactRouter } from './routes/contact.js';
import cors from 'cors';
import multer from 'multer';


const app = express();

config({ path: './config/config.env' });

//middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(multer());

//routes
app.get("/protected", auth, (req,res) => {
    return res.status(200).json({...req.user._doc });
});
app.use("/api", authRouter);
app.use("/api", contactRouter);

//server configuration
const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
    try {
    await connectDB();
    console.log(`server listening on port: ${PORT}`);
    } catch (err) {

    }
});

