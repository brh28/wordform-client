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
        title: 'Word Form',
        icon: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png"
      }
    }),
    jest()
    // devServer({
    //   port: 3001,
    //   proxy: { "/api/**": { target: 'http://localhost:3000', secure: false }  },
    //   compress: true,
    //   public: 'localhost:3001' // That solved it
    // })
  ],
};
