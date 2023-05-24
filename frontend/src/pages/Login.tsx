import { useNavigate, Link } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useAuth } from '../support/Auth';
import { PageHeader } from '../components/PageHeader';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        name
        profilePhoto
      }
    }
  }
`;

export function Login() {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const result = data.login;
      if (result) {
        setAuthToken(result.token);
        navigate('/');
      } else {
        setErrorMessage('Invalid username or password');
      }
    },
  });
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <PageHeader title="Welcome" />
      <Stack
        component="form"
        padding={2}
        spacing={2}
        flex={1}
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          login({ variables: { username, password } });
        }}
      >
        {errorMessage ? (
          <Alert
            severity="error"
            onClose={() => {
              setErrorMessage('');
            }}
          >
            {errorMessage}
          </Alert>
        ) : null}
        <TextField
          label="Username"
          placeholder="Enter your username"
          autoFocus={true}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Stack flex={1} />
        <Stack alignItems="stretch">
          {loading ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <Button type="submit" variant="contained" size="large">
              Login
            </Button>
          )}
        </Stack>
        <Stack alignItems="center">
          <Typography>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
