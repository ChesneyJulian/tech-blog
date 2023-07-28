// require Model and DataTypes from Sequelize
const { Model, DataTypes } = require('sequelize');
// require connection to db in config/connection
const sequelize = require('../config/connection');

// extend Comment from model and add custom method to getDate
class Comment extends Model {
  async getDate () {
    new Date().toString();
  }
};

// create instance of Comment and define columns
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    creatorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: getDate()
    }
  },
  {
    sequelize,
    timeStamps: false,
    freezeTableName: true,
    modelName: 'comment'
  }
);

// export Comment model
module.exports = Comment;