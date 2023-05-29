import { ApolloProvider } from '@apollo/client';

import { AuthProvider } from './support/Auth';
import { SnackbarProvider } from './components/Snackbar';
import { Router } from './Router';
import { client } from './support/apolloClient';

export function App() {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </SnackbarProvider>
    </ApolloProvider>
  );
}
