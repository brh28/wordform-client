const neutrino = require('neutrino');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = neutrino().jest();
