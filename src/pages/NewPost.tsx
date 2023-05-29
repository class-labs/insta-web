import { useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';

import { PageHeader } from '../components/PageHeader';
import { PhotoUpload } from '../components/PhotoUpload';
import { CreatePost, CreatePostVariables } from '../__generated__/CreatePost';

const CREATE_POST = gql`
  mutation CreatePost($caption: String!, $photo: String!) {
    createPost(input: { caption: $caption, photo: $photo }) {
      id
    }
  }
`;

export function NewPost() {
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [createPost, { loading }] = useMutation<
    CreatePost,
    CreatePostVariables
  >(CREATE_POST, {
    onCompleted: (data) => {
      console.log('Completed:', data);
      navigate('/');
    },
    onError: (error) => {
      setErrorMessage(String(error));
    },
  });
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <PageHeader backUrl="/" title="New Post" />
      <Stack
        component="form"
        padding={2}
        spacing={2}
        flex={1}
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          createPost({ variables: { caption, photo: photoUrl } });
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
        <PhotoUpload
          onChange={(url) => {
            setPhotoUrl(url);
          }}
        />
        <TextField
          multiline={true}
          rows={4}
          label="Caption"
          placeholder="Enter a caption"
          value={caption}
          onChange={({ target }) => setCaption(target.value)}
        />
        <Stack flex={1} />
        <Stack alignItems="stretch" paddingBottom={2}>
          {loading ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <Button type="submit" variant="contained" size="large">
              Share Now
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
