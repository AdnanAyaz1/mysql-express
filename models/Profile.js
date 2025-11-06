import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Profile = sequelize.define('Profile', {
  bio: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Profile;
