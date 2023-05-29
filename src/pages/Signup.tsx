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

import { PageHeader } from '../components/PageHeader';
import { PhotoUpload } from '../components/PhotoUpload';
import { Avatar } from '../components/Avatar';
import { FixedRatioImage } from '../components/FixedRatioImage';
import { useSnackbar } from '../components/Snackbar';
import { Signup as SignupType, SignupVariables } from '../__generated__/Signup';

const SIGNUP = gql`
  mutation Signup(
    $name: String!
    $username: String!
    $password: String!
    $profilePhoto: String!
  ) {
    createUser(
      input: {
        name: $name
        username: $username
        password: $password
        profilePhoto: $profilePhoto
      }
    ) {
      id
      name
      username
    }
  }
`;

export function Signup() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [photoUrl, setPhotoUrl] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signup, { loading }] = useMutation<SignupType, SignupVariables>(
    SIGNUP,
    {
      onError: (error) => {
        // TODO: Think of a better user-facing error message
        setErrorMessage('Mutation failed');
        // The error will contain some addition details in the GraphQL response. It might be worth looking in to how we can extract better details to show the user.
        console.log(error);
      },
      onCompleted: (data) => {
        showSnackbar('success', 'Signup successful.');
        navigate('/login');
      },
    },
  );
  const isValid = password === password2;
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <PageHeader title="Create an Account" />
      <Stack
        component="form"
        padding={2}
        spacing={2}
        flex={1}
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (isValid) {
            signup({
              variables: { name, username, password, profilePhoto: photoUrl },
            });
          }
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
        <Stack alignItems="center">
          {!photoUrl ? <Avatar src="" size={64} /> : null}
          <PhotoUpload
            buttonText="Choose a Profile Photo"
            buttonVariant="text"
            renderPhoto={(src) => (
              <FixedRatioImage src={src} width={72} borderRadius={36} />
            )}
            onChange={(url) => {
              setPhotoUrl(url);
            }}
          />
        </Stack>
        <TextField
          label="Name"
          placeholder="Enter your name"
          autoFocus={true}
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          label="Username"
          placeholder="Enter your username"
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
        <TextField
          label="Confirm Password"
          placeholder="Re-enter your password"
          type="password"
          value={password2}
          onChange={({ target }) => setPassword2(target.value)}
        />
        {!isValid ? (
          <Alert severity="error">Passwords do not match</Alert>
        ) : null}
        <Stack flex={1} />
        <Stack alignItems="stretch">
          {loading ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <Button
              disabled={!isValid}
              type="submit"
              variant="contained"
              size="large"
            >
              Sign up
            </Button>
          )}
        </Stack>
        <Stack alignItems="center">
          <Typography>
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
