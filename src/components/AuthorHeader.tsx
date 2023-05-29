import { Stack, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { Avatar } from './Avatar';

type Author = {
  id: string;
  name: string;
  profilePhoto: string;
};

type Props = {
  author: Author;
};

export function AuthorHeader(props: Props) {
  const { author } = props;
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      padding={1}
      onClick={() => {
        navigate(`/users/${author.id}`, {
          state: { previousPage: location.pathname },
        });
      }}
    >
      <Avatar src={author.profilePhoto} />
      <Typography>{author.name}</Typography>
    </Stack>
  );
}
