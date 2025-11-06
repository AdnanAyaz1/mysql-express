import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Profile = sequelize.define('Profile', {
  bio: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
});

export default Profile;
