import { Sequelize, DataTypes } from "sequelize"
import env from "dotenv"
env.config()

const port: number = Number(process.env.POSTGRES_PORT)
const host = process.env.POSTGRES_HOST as string
const username = process.env.POSTGRES_USER as string
const password = process.env.POSTGRES_PASSWORD as string
const database = process.env.POSTGRES_DB as string

const client = new Sequelize(database, username, password, {
    host: "localhost",
    dialect: "postgres",
})

export const connectToDatabase = async () => {
    try {
        await client.authenticate()
        console.log("Connection has been established successfully.")
        return client
    } catch (error) {
        console.error("Unable to connect to the database:", error)
        return false
    }
}
