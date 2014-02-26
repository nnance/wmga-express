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
      name: 'wmga-production'
    },
    port: 80,
    db: 'mongodb://nodejitsu_nancenick:9sbirh3oi9li8bhhavccb4ov3q@ds061558.mongolab.com:61558/nodejitsu_nancenick_nodejitsudb2721215477'
  }
};

module.exports = config[env];
