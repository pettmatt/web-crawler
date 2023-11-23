import { Sequelize, DataTypes } from "sequelize"
import { client } from "./client"
import env from "dotenv"
env.config()

const productionMode = process.env.PRODUCTION

const Sites = client.define("sites", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    header: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category: DataTypes.ARRAY(DataTypes.STRING),
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
    }
})

client.sync({ force: (productionMode === "development") }).then(() => {
    console.log("Site table created.")
}).catch(error => {
    console.log(`Unable to create site table: ${error}`)
})

export default Sites
