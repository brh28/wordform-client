const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
const devServer = require('@neutrinojs/dev-server');

module.exports = {
  options: {
    root: __dirname
  },
  use: [
    // airbnb(),
    react({
      publicPath: '/',
      html: {
        title: 'WordForm',
        favicon: './favicon.ico'
      }
    }),
    jest(),
    devServer({
      port: 5000,
      proxy: { "/api/**": { target: 'http://localhost:3000', secure: false }  },
      https: false,
      compress: false, // required for server-side events
      public: 'localhost:5000' // public
    })
  ],
};
