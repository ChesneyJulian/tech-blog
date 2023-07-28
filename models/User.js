// bring in Model class and Datatypes from sequelize
const { Model, DataTypes } = require('sequelize');
// initialize connection with db
const sequelize = require('../config/connection');

// extend user from model to add custom password comparison method to user
class User extends Model {
  // check that password entered at login matches User's password with bcrypt
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
};

// create instance of user and define columns
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate that password is greater than 8 and less than 32 characters
      validate: {
        len: {
          args: [8, 32],
          msg: "Password length must be between 8-32 characters"
        } 
      }
    },
  },
  {
    // add hooks
    hooks: {
      // use bcrypt to hash password (10 cycles) when creating a new user
      async beforeCreate(userData) {
        userData.password = await bcrypt.hash(newUserData.password, 10);
        return userData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'user'
  }
);

// export User model
module.exports = User;