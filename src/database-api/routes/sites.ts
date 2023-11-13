import express from "express"
import controller from "../controllers/siteController"

const router = express.Router()

router.get("/sites", controller.findAll)

export default router
