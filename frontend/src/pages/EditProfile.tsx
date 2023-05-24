import { useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { CircularProgress, Stack } from '@mui/material';

import { EditProfileForm } from '../components/EditProfileForm';
import { PageHeader } from '../components/PageHeader';

const GET_MY_PROFILE = gql`
  query GetMyProfile {
    me {
      id
      name
      username
      profilePhoto
    }
  }
`;

const UPDATE_MY_PROFILE = gql`
  mutation UpdateMyProfile(
    $name: String
    $username: String
    $profilePhoto: String
  ) {
    updateUser(
      input: { name: $name, username: $username, profilePhoto: $profilePhoto }
    ) {
      id
      name
      username
      profilePhoto
    }
  }
`;

export function EditProfile() {
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: 'cache-and-network',
  });
  const [updateUser, { loading: isSaving, error }] = useMutation(
    UPDATE_MY_PROFILE,
    {
      onCompleted: () => {
        navigate('/my-profile');
      },
    },
  );
  if (loading) {
    return <CircularProgress />;
  }
  if (!data || !data.me) {
    return null;
  }
  const user = data.me;
  return (
    <Stack>
      <PageHeader backUrl="/my-profile" title="Edit Profile" />
      <EditProfileForm
        user={user}
        onSave={(newUser) => {
          const { name, username, profilePhoto } = newUser;
          updateUser({
            variables: { name, username, profilePhoto },
          });
        }}
        isSaving={isSaving}
        error={error ? String(error) : null}
      />
    </Stack>
  );
}
