import express from "express"
import { postUser } from "../controllers/registercontroller.js"

const router = express.Router()

router.post("/",postUser)

export default router