import express from "express";
import bodyParser from "body-parser";
import privateRoutes from "../src/api/index";
import mongoose from "mongoose";
import config from "./config/local.config";
import cors from "cors";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(config.MONGO_URL)
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

// Multer configuration for file upload
// const upload = multer({ dest: 'uploads/' });
// app.use("/uploads", express.static(path.join("/uploads")));

// Routes
app.use("/private/api", privateRoutes);

// Start server
app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});
