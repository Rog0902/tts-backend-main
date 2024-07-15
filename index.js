import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import 'dotenv/config';
import dotenv from 'dotenv';

import authRouter from './routes/authRouter.js';
import taskRouter from './routes/taskRouter.js';

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }));
app.use(cors())

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("mongoDB is connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Wellcome")
})

app.use("/api", authRouter);
app.use("/api", taskRouter);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Server is running on port', port)
})