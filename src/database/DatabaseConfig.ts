import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config()
export const sequelize = new Sequelize('postgres', 'postgres', 'password', {
    host: 'db',
    dialect: 'postgres',
    port: 5432,
})