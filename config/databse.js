
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_username,
    process.env.db_password,
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);
