import User from './User.js';
import Post from './Post.js';
import Tag from './Tag.js';
import Profile from './Profile.js';
import sequelize from '../config/database.js';

// 1️⃣ One-to-One Association
User.hasOne(Profile, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Profile.belongsTo(User, {
  foreignKey: 'userId'
});


// One-to-Many
User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Many-to-Many
Post.belongsToMany(Tag, { through: 'PostTag' });
Tag.belongsToMany(Post, { through: 'PostTag' });




export { User, Post, Tag };
