import User from './User.js';
import Post from './Post.js';
import Tag from './Tag.js';
import sequelize from '../config/database.js';

// One-to-Many
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Many-to-Many
Post.belongsToMany(Tag, { through: 'PostTag' });
Tag.belongsToMany(Post, { through: 'PostTag' });


await sequelize.sync({ alter: true });
console.log('✅ Tables synced!');

export { User, Post, Tag };
