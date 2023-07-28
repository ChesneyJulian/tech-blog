// require Model and DataTypes from Sequelize
const { Model, DataTypes } = require('sequelize');
// require connection to db in config/connection
const sequelize = require('../config/connection');

// extend Post from model and add custom method to getDate
class Post extends Model {
};

// create instance of Post and define columns
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creatorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    // dateCreated: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: getDate()
    // }
  },
  {
    sequelize,
    timeStamps: false,
    freezeTableName: true,
    modelName: 'post'
  }
);

// export Post model
module.exports = Post;