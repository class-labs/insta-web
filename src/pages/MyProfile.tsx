import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import { IconButton, Stack, CircularProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '../support/Auth';
import { useSnackbar } from '../components/Snackbar';
import { PageHeader } from '../components/PageHeader';
import { Profile } from '../components/Profile';
import { BottomNav } from '../components/BottomNav';

const GET_MY_USER_ID = gql`
  query GetMyUserId {
    me {
      id
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export function MyProfile() {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { data, loading } = useQuery(GET_MY_USER_ID);
  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      setAuthToken(null);
      showSnackbar('success', 'You have been logged out');
      navigate('/login');
    },
  });
  if (loading && !data) {
    return <CircularProgress />;
  }
  const userId = data?.me?.id ?? '';
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <PageHeader
        title="Profile"
        rightIcon={
          <IconButton
            onClick={() => {
              logout();
            }}
          >
            <LogoutIcon sx={{ color: 'black' }} />
          </IconButton>
        }
      />
      <Profile userId={userId} />
      <Stack flex={1} />
      <BottomNav />
    </Stack>
  );
}
