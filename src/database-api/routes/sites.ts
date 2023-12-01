import express from "express"
import controller from "../controllers/siteController"

const router = express.Router()

router.get("/sites", controller.findAll)
router.post("/sites", controller.createOne)
router.put("/sites/:id", controller.updateOne)
router.delete("/sites/:id", controller.deleteOne)

export default router
