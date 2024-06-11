import express, { Request, Response } from "express";
const app = express();
app.set('trust proxy', 1);
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "path";
import mongoSanitize from 'express-mongo-sanitize';
import helmet from "helmet";
import rateLimit from "express-rate-limit";


// import routes
var taskRoutes = require("./routes/taskRoute");
var authRoutes = require("./routes/authRoute");
var userRoutes = require("./routes/userRoute");

//const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
var errorHandler = require("./middleware/error");

//database connection
mongoose
  .connect(process.env.DATABASE!)
  .then(() => console.log("DB connected"))
  .catch((err: any) => console.log(err));

//MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

// prevent SQL injection
app.use(mongoSanitize());
// adding security headers
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)

interface ENV {
  PORT: number | undefined;
  SMTP_PORT: number | undefined;
}

//limit queries per 15mn
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);

// //ROUTES MIDDLEWARE
// app.get('/', (req:Request, res: Response) => {
//     res.send("Hello from Node Js");
// })
app.use("/api", taskRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/backend/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "backend", "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send("API is running....");
  });
}

// // error middleware
app.use(errorHandler);

//port
const PORT: number = parseInt((process.env.PORT) as string) || 10000
console.log(PORT)

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});
