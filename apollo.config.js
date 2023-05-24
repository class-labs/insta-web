// TODO: Import this from constants or use .env
const API_HOST = 'https://insta.web-api.dev';

module.exports = {
  client: {
    service: {
      name: 'api',
      url: API_HOST + '/graphql',
    },
  },
};
