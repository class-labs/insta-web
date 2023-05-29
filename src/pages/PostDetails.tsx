import { useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';
import { IconButton, Stack, Typography, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { FixedRatioImage } from '../components/FixedRatioImage';
import { PageHeader } from '../components/PageHeader';
import { CommentView } from '../components/CommentView';
import { CommentForm } from '../components/CommentForm';
import { AuthorHeader } from '../components/AuthorHeader';

import { GET_POST, CREATE_COMMENT, LIKE_POST } from '../queries/queries';
import { GetPost } from '../__generated__/GetPost';
import {
  CreateComment,
  CreateCommentVariables,
} from '../__generated__/CreateComment';
import { LikePost, LikePostVariables } from '../__generated__/LikePost';

export function PostDetails() {
  const params = useParams();
  const location = useLocation();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const postId = params.id ?? '';
  const { data, loading } = useQuery<GetPost>(GET_POST, {
    variables: { postId },
    fetchPolicy: 'cache-and-network',
  });
  const [createComment, { loading: sendingComment }] = useMutation<
    CreateComment,
    CreateCommentVariables
  >(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_POST }, 'GetPost'],
  });
  const [likePost] = useMutation<LikePost, LikePostVariables>(LIKE_POST, {
    refetchQueries: [{ query: GET_POST }, 'GetPost'],
  });
  if (loading && !data) {
    return <CircularProgress />;
  }
  if (!data || !data.post) {
    return <p>Not found</p>;
  }
  const post = data.post;
  return (
    <Stack>
      <PageHeader backUrl="/" title="Details" />
      <Stack>
        <AuthorHeader author={post.author} />
        <FixedRatioImage src={post.photo} />
        <Stack direction="row" padding={1} spacing={1}>
          <IconButton
            onClick={() => {
              likePost({ variables: { postId } });
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
              const commentInput = commentInputRef.current;
              commentInput?.focus();
            }}
          >
            <ChatBubbleOutlineIcon sx={{ color: 'black' }} />
          </IconButton>
        </Stack>
        <Stack px={2} pb={1} spacing={1} borderBottom="1px solid #e8e8e8">
          <Typography fontWeight={500}>
            {post.likeCount} {post.likeCount === 1 ? 'like' : 'likes'}
          </Typography>
          <Typography
            sx={{
              opacity: 0.8,
            }}
          >
            {post.caption}
          </Typography>
        </Stack>
        <Stack px={2} py={1} spacing={1}>
          <Typography fontWeight={500}>
            Comments ({post.comments.length})
          </Typography>
          <Stack>
            {post.comments.map((comment) => (
              <CommentView key={comment.id} comment={comment} />
            ))}
          </Stack>
          <CommentForm
            inputRef={commentInputRef}
            autoFocus={location.state?.initialFocus === 'comment-input'}
            sending={sendingComment}
            onSubmit={(text) => {
              createComment({ variables: { postId, text } });
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
