import express from "express"
import { postPatient,getPatient } from "../controllers/patientcontroller.js"

const router = express.Router()
//sdfghj
router.post("/",postPatient)
router.get("/:id",getPatient)

export default router
