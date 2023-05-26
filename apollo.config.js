require('dotenv').config();

const API_HOST = process.env.REACT_APP_API_HOST ?? '';

module.exports = {
  client: {
    service: {
      name: 'api',
      url: API_HOST + '/graphql',
    },
  },
};
