import { Sequelize, DataTypes } from "sequelize"
import * as env from "dotenv"
import { client } from "./client"

env.config()

const productionMode = process.env.NODE_ENV

const Sites = client.define("sites", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	header: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: DataTypes.STRING,
	url: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	tags: DataTypes.ARRAY(DataTypes.STRING),
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		allowNull: false,
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		allowNull: false,
	},
})

client.sync({ force: (productionMode === "development") }).then(() => {
	console.log("Site table created.")
}).catch((error) => {
	console.log(`Unable to create site table: ${error}`)
})

export default Sites
