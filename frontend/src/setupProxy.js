const { resolve } = require('path');

require('ts-node').register({
  project: resolve(__dirname, '../../server/tsconfig.json'),
  transpileOnly: true,
});

const { attachHandlers } = require('../../server/src/server');

module.exports = (app) => {
  app.disable('x-powered-by');
  attachHandlers(app);
};
