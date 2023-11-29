import { Sequelize } from "sequelize"
import env from "dotenv"

env.config()

const port = Number(process.env.POSTGRES_PORT)
const host = process.env.DATABASE_HOST
const username = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const database = process.env.POSTGRES_DB
const productionMode = process.env.PRODUCTION

const client = new Sequelize(database, username, password, {
	host,
	port,
	dialect: "postgres",
	logging: (productionMode === "development") ? (message) => {
		console.log(`Sequelize logging message: ${message}`)
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
