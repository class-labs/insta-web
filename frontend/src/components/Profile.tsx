import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from '@mui/material';

import { FixedRatioImage } from '../components/FixedRatioImage';
import { Avatar } from '../components/Avatar';

type GetUserProfile = {
  user: {
    id: string;
    name: string;
    username: string;
    profilePhoto: string;
  };
  posts: Array<{
    id: string;
    photo: string;
  }>;
  me: {
    id: string;
  };
};

const GET_PROFILE_WITH_POSTS = gql`
  query GetProfileWithPosts($userId: String!) {
    user(id: $userId) {
      id
      name
      username
      profilePhoto
    }
    posts(postedBy: $userId) {
      id
      photo
    }
    me {
      id
    }
  }
`;

export function Profile(props: { userId: string }) {
  const { userId } = props;
  const navigate = useNavigate();
  const { data, loading } = useQuery<GetUserProfile>(GET_PROFILE_WITH_POSTS, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
  });
  if (loading && !data) {
    return <CircularProgress />;
  }
  if (!data || !data.user || !data.me) {
    return <p>User not found</p>;
  }
  const { user, posts, me } = data;
  const isMyProfile = user.id === me.id;
  return (
    <Stack>
      <Stack
        padding={2}
        spacing={1}
        alignItems="center"
        borderBottom="1px solid #e8e8e8"
      >
        <Avatar src={user.profilePhoto} size={72} />
        <Typography fontWeight="bold" fontSize={18}>
          {user.name}
        </Typography>
        <Typography sx={{ opacity: 0.6 }}>{`@${user.username}`}</Typography>
        {isMyProfile ? (
          <Button
            variant="contained"
            onClick={() => {
              navigate('/my-profile/edit');
            }}
          >
            Edit Profile
          </Button>
        ) : null}
      </Stack>
      {posts.length ? (
        <ImageList cols={3} sx={{ margin: '4px 0' }}>
          {posts.map((post) => (
            <ImageListItem key={post.id}>
              <FixedRatioImage src={post.photo} />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Stack alignItems="center" padding={2}>
          <Typography>No posts yet</Typography>
        </Stack>
      )}
    </Stack>
  );
}
