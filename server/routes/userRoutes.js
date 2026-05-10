import express from "express";
import { signup, login, checkAuth, updateProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js"

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profil", protectRoute, updateProfile);
userRouter.post("/check", protectRoute, checkAuth);

export default userRouter;