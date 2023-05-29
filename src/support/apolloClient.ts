import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { API_HOST } from './constants';

const httpLink = createHttpLink({
  uri: API_HOST + '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('auth-token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
