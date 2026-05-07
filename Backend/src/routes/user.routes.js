import express from "express";
import upload from "../middleware/multer.js";
import { uploadPDF } from "../Controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/upload", upload.single("pdf"), uploadPDF);
export default userRouter;
