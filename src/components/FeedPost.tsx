import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Stack, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { FixedRatioImage } from './FixedRatioImage';
import { AuthorHeader } from './AuthorHeader';
import { RelativeTimeView } from './RelativeTimeView';

import { LIKE_POST, GET_POSTS, DELETE_POST } from '../queries/queries';
import { PopoverMenu } from './PopoverMenu';

type Post = {
  id: string;
  photo: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  author: {
    id: string;
    name: string;
    profilePhoto: string;
  };
  isLikedByViewer: boolean;
  createdAt: string;
};

type Props = {
  userId: string | null;
  post: Post;
};

export function FeedPost(props: Props) {
  const { userId, post } = props;
  const navigate = useNavigate();
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [{ query: GET_POSTS }, 'GetPosts'],
  });
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }, 'GetPosts'],
  });

  return (
    <Stack>
      <AuthorHeader author={post.author} />
      <FixedRatioImage
        src={post.photo}
        onClick={() => {
          navigate(`/posts/${post.id}`);
        }}
      />
      <Stack padding={1} spacing={1}>
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => {
              likePost({ variables: { postId: post.id } });
            }}
          >
            {post.isLikedByViewer ? (
              <FavoriteIcon sx={{ color: '#F7444E' }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: 'black' }} />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              navigate(`/posts/${post.id}`, {
                state: { initialFocus: 'comment-input' },
              });
            }}
          >
            <ChatBubbleOutlineIcon sx={{ color: 'black' }} />
          </IconButton>
          <Box sx={{ flex: 1 }} />
          {userId === post.author.id ? (
            <PopoverMenu
              icon={<MoreVertIcon sx={{ color: 'black' }} />}
              items={[
                {
                  label: 'Delete',
                  onClick: () => {
                    deletePost({ variables: { postId: post.id } });
                  },
                },
              ]}
            />
          ) : null}
        </Stack>
        <Typography>
          {post.likeCount} {post.likeCount === 1 ? 'like' : 'likes'}
        </Typography>
        <Typography>{post.caption}</Typography>
        <Link to={`/posts/${post.id}`}>
          View {post.commentCount}{' '}
          {post.commentCount === 1 ? 'comment' : 'comments'}
        </Link>
        <RelativeTimeView timestamp={post.createdAt} />
      </Stack>
    </Stack>
  );
}
