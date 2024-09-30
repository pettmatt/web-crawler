import { testDatabaseConnection } from "./database/client"
import express, { Request, Response } from "express"
import stationRoutes from "./routes/sites"
import compression from "compression"
import cors from "cors"
import * as env from "dotenv"

env.config()

const productionMode = process.env.NODE_ENV
const app = express()
const port = process.env.PORT || 3000
const origin = process.env.CORS_ORIGIN || "http://localhost:4200"

const corsOptions = {
    origin: origin,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(compression())
app.use(express.json())

// Optional: Limit requests that the client and the bot scripts can make (returning 429 status code). (Check if necessary)

if (productionMode === "development") {
    testDatabaseConnection()
}

app.use("/", [stationRoutes])
app.use("/", (_req: Request, res: Response) => {
    res.send("Hello world from web-crawler API service")
})

app.use((_req: Request, res: Response) => {
    res.status(404).send("The page doesn't exist")
})

app.use((error: Error, _req: Request, res: Response) => {
    res.status(500).json({
        message: "Internal server error",
        error,
    })
})

app.listen(port, () => {
    console.log(`Express is listening at ${
        (process.env.API_ADDRESS) ? process.env.API_ADDRESS : "http://localhost"
    }:${port}`)
})
