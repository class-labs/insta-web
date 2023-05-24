import { Stack, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { Avatar } from './Avatar';
import { RelativeTimeView } from './RelativeTimeView';

type Comment = {
  id: string;
  text: string;
  author: Author;
  createdAt: string;
};

type Author = {
  id: string;
  name: string;
  profilePhoto: string;
};

type Props = {
  comment: Comment;
};

export function CommentView(props: Props) {
  const { comment } = props;
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Stack direction="row" alignItems="flex-start" spacing={1} padding={1}>
      <Avatar
        src={comment.author.profilePhoto}
        onClick={() => {
          navigate(`/users/${comment.author.id}`, {
            state: { previousPage: location.pathname },
          });
        }}
      />
      <Stack>
        <Typography>
          <strong>{comment.author.name}</strong> {comment.text}
        </Typography>
        <RelativeTimeView timestamp={comment.createdAt} />
      </Stack>
    </Stack>
  );
}
