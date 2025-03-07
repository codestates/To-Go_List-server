'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { user, post, post_hashtag, hashtag } = sequelize.models;
// user-post associations
user.hasMany(post);
post.belongsTo(user);

// post-hashtag associations
post.belongsToMany(hashtag, {
  through: post_hashtag,
  foreignKey: 'postid'
});
hashtag.belongsToMany(post, {
  through: post_hashtag,
  foreignKey: 'hashtagid'
});

post_hashtag.belongsTo(post, {
  foreignKey: 'postid'
});
post_hashtag.belongsTo(hashtag, {
  foreignKey: 'hashtagid'
});

// user-hashtag associations
user.hasMany(hashtag);
hashtag.belongsTo(user);

module.exports = db;
