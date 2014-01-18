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
    port: 3000,
    db: 'mongodb://localhost/wmga-express-production'
  }
};

module.exports = config[env];
