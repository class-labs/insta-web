import { useState, FormEvent } from 'react';
import {
  Stack,
  Button,
  CircularProgress,
  TextField,
  Alert,
} from '@mui/material';

import { Avatar } from './Avatar';
import { PhotoUpload } from './PhotoUpload';

type User = {
  id: string;
  name: string;
  username: string;
  profilePhoto: string;
};

type Props = {
  user: User;
  onSave: (user: User) => void;
  isSaving: boolean;
  error: string | null;
};

export function EditProfileForm(props: Props) {
  const { user, onSave, isSaving, error } = props;
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);
  return (
    <Stack
      component="form"
      padding={2}
      spacing={2}
      flex={1}
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({
          id: user.id,
          name,
          username,
          profilePhoto,
        });
      }}
    >
      {error ? <Alert severity="error">{error}</Alert> : null}
      <Stack alignItems="center">
        <Avatar key={profilePhoto} src={profilePhoto} size={72} />
        <PhotoUpload
          buttonText="Change Profile Photo"
          buttonVariant="text"
          renderPhoto={(src) => <></>}
          onChange={(url) => {
            setProfilePhoto(url);
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
      <Stack flex={1} />
      <Stack alignItems="stretch">
        {isSaving ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
          <Button type="submit" variant="contained" size="large">
            Save Changes
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
