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
      // By default @neutrinojs/react assumes that your application will be deployed 
      // at the root of a domain (eg: https://www.my-app.com/), 
      // and so sets webpack's output.publicPath to '/', 
      // which means assets will be loaded from the site root using absolute paths.
      publicPath: '/',
      html: {
        title: 'internal title',
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
