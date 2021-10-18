import express from "express"
import { signup, auth, getMe } from "../controller/user.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { validateSignUp } from "../validation/signup.js"

const userRouter = express.Router()

userRouter.route("/signup").post(validateSignUp, signup)
userRouter.route("/auth").post(auth)
userRouter.get("/me", authMiddleware, getMe)
