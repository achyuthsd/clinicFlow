import express from "express"
import { getUserId } from "../controllers/usercontroller.js"

const router = express.Router()

router.get("/:id",getUserId)

export default router