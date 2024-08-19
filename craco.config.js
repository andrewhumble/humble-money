// craco.config.js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@heading-3-size': '100px', // This sets the font size for level 3 titles globally
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
