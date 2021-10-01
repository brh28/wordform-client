const airbnb = require('@neutrinojs/airbnb');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
const devServer = require('@neutrinojs/dev-server');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    // airbnb(),
    react({
      html: {
        title: 'Logos'
      }
    }),
    jest(),
    devServer({
      port: 3001,
      proxy: { "/api/**": { target: 'http://localhost:3000', secure: false }  }
    })
  ],
};
