'use strict';
require('dotenv').config();
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
// require('sequelize-hierarchy')(Sequelize);
var basename = path.basename(__filename);
var db = {};

var opt = {
  host: CONFIG.db_host,
  dialect: CONFIG.db_dialect,
  port: CONFIG.db_port,
  timezone: CONFIG.timezone,
  dialectOptions: {
    connectTimeout: 60000
  }
};

if (process.env.NODE_ENV == 'production') {
  opt.logging = false;
}

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, opt);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;