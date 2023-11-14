import { Sequelize, DataTypes } from "sequelize"
import env from "dotenv"
env.config()

const port: number = Number(process.env.POSTGRES_PORT)
const host = process.env.DATABASE_HOST as string
const username = process.env.POSTGRES_USER as string
const password = process.env.POSTGRES_PASSWORD as string
const database = process.env.POSTGRES_DB as string
const productionMode = (process.env.PRODUCTION.toLowerCase() === "true") ? true : false

const client = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: "postgres",
    logging: (productionMode) ? (message) => {
        console.log("Sequelize logging message:", message)
    } : false,
})

function testDatabaseConnection() {
    client.authenticate().then(() => {
        console.log("Database is reachable.")
    }).catch((error) => {
        console.error(`Database connection issue: ${error}`)
    })
}

export { client, testDatabaseConnection }
