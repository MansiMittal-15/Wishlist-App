import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/user.js";
import bodyParser from "body-parser";
import wishlistRouter from "./routes/wishlist.js";
import productRouter from "./routes/product.js";
import connectCloudinary from "./config/cloudinary.js";
dotenv.config({});
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://wishlist-app-new.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/product", productRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server listens at port ${PORT}`);
});
