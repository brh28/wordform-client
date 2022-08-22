const airbnb = require('@neutrinojs/airbnb');
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
      html: {
        title: 'Word Form'
        // icon: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png"
      }
    }),
    jest(),
    devServer({
      port: 5000,
      // proxy: { "/api/**": { target: 'https://localhost:3000', secure: false }  },
      https: true
      // compress: true,
      // public: 'localhost:3001' // That solved it
    })
  ],
};
