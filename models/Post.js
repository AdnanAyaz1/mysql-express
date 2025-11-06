import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // adjust path if needed


const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export default Post;
