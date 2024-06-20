import dotenv from "dotenv";
dotenv.config();

const config = {
    MONGO_URL: process.env.MONGO_URL || "mongodb+srv://sonikaparmar23:vzgw62me4j6nWONr@cluster0.vidyfwr.mongodb.net/tasks?retryWrites=true&w=majority&appName=Cluster0",
    PORT: process.env.PORT || 3000,
    UI_URL: process.env.UI_URL || "",
    NODE_ENV: process.env.NODE_ENV || "local"
};

export default config;