import express from "express"
import controller from "../controllers/pageController"

const router = express.Router()

router.get("/pages", controller.findAll)

export default router
