// User has many posts
// Post has many comments

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// user has many posts
User.hasMany(Post, {
  foreignKey: 'creatorId',
});
// user has many comments
User.hasMany(Comment, {
  foreignKey: 'creatorId'
});
// post belongs to user
Post.belongsTo(User, {
  foreignKey: 'creatorId'
});
// comment belongs to user
Comment.belongsTo(User, {
  foreignKey: 'creatorId'
});
// post has many comments
Post.hasMany(Comment, {
  foreignKey: 'postId'
});
// comment belongs to post
Comment.belongsTo(Post, {
  foreignKey: 'postId'
});

module.exports = { User, Post, Comment };