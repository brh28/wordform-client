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
        title: 'Dirt'
      }
    }),
    jest(),
    devServer({
      port: 3001,
      proxy: { "/api/**": { target: 'https://localhost:3000', secure: false }  }
    })
  ],
};
