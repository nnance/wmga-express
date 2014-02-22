var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'wmga-express'
    },
    port: 3000,
    db: 'mongodb://localhost/wmga-express-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'wmga-express'
    },
    port: 3000,
    db: 'mongodb://localhost/wmga-express-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'wmga-express'
    },
    port: 80,
    db: 'mongodb://nodejitsu:643943871a4f58720188afc78ba19457@troup.mongohq.com:10037/nodejitsudb7060573752'
  }
};

module.exports = config[env];
