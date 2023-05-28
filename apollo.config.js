require('dotenv').config();

const API_HOST = process.env.VITE_API_HOST ?? '';

module.exports = {
  client: {
    service: {
      name: 'api',
      url: API_HOST + '/graphql',
    },
  },
};
