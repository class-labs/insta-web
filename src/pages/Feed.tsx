import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Stack, CircularProgress, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { FeedPost } from '../components/FeedPost';
import { PageHeader } from '../components/PageHeader';
import { BottomNav } from '../components/BottomNav';

import { GET_POSTS } from '../queries/queries';
import { GetPosts } from '../__generated__/GetPosts';
import { GetPosts_posts as Post } from '../__generated__/GetPosts';

export function Feed() {
  const navigate = useNavigate();
  const { data, loading } = useQuery<GetPosts>(GET_POSTS, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      sessionStorage.setItem('feed-scroll-position', String(scrollPosition));
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (loading && !data) {
    return <CircularProgress />;
  }

  const userId = data?.me?.id ?? null;
  const posts = data?.posts ?? [];

  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Stack spacing={2}>
        <PageHeader
          title="Home"
          rightIcon={
            <IconButton
              onClick={() => {
                navigate('/posts/new');
              }}
            >
              <AddIcon sx={{ color: 'black' }} />
            </IconButton>
          }
        />
        <PostList userId={userId} posts={posts} />
      </Stack>
      <Stack flex={1} />
      <BottomNav />
    </Stack>
  );
}

function PostList(props: { userId: string | null; posts: Array<Post> }) {
  const { userId, posts } = props;
  useEffect(() => {
    const initialScrollPosition = sessionStorage.getItem(
      'feed-scroll-position',
    );
    if (initialScrollPosition !== null) {
      window.scrollTo(0, Number(initialScrollPosition));
    }
  }, []);
  return (
    <>
      {posts?.map((post) => (
        <FeedPost key={post.id} userId={userId} post={post} />
      ))}
    </>
  );
}
