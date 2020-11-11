'use strict';
const crypto = require('crypto');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    phonenum: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: data => {
        let shasum = crypto.createHmac('sha512', 'to-go-SecRet!$');
        shasum.update(data.password);
        data.password = shasum.digest('hex');
      },
      beforeFind: data => {
        if (data.where.password) {
          let shasum = crypto.createHmac('sha512', 'to-go-SecRet!$');
          shasum.update(data.where.password);
          data.where.password = shasum.digest('hex');
        };
      }
    }, sequelize
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};