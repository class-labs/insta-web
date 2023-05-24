import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useApolloClient, gql } from '@apollo/client';

const VALIDATE_TOKEN = gql`
  query GetCurrentUser {
    me {
      id
    }
  }
`;

type Context = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
};

const AuthContext = createContext<Context | null>(null);

export function AuthProvider(props: { children: ReactNode }) {
  const client = useApolloClient();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const authToken = sessionStorage.getItem('auth-token');
      if (authToken != null) {
        const result = await client.query({ query: VALIDATE_TOKEN });
        const isValid = result?.data?.me != null;
        if (!isValid) {
          sessionStorage.removeItem('auth-token');
        }
      }
      setInitialized(true);
    };
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return initialized ? <AuthContextProvider {...props} /> : null;
}

function AuthContextProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return sessionStorage.getItem('auth-token');
  });
  const context = useMemo<Context>(
    () => ({
      authToken,
      setAuthToken: (token) => {
        if (token) {
          sessionStorage.setItem('auth-token', token);
        } else {
          sessionStorage.removeItem('auth-token');
        }
        setAuthToken(token);
      },
    }),
    [authToken, setAuthToken],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
