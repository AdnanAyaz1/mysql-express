
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_username,
    process.env.db_password,
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

export default sequelize;
