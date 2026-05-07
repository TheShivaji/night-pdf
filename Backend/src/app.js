import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

/**
 * @Routes
 * @app.use("/api/user", userRouter);
 * @http://localhost:3000/api/user/upload
 */
app.use("/api/user", userRouter);

export default app;
