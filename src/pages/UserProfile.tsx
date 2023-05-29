import { useLocation, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

import { PageHeader } from '../components/PageHeader';
import { Profile } from '../components/Profile';

export function UserProfile() {
  const params = useParams();
  const userId = params.id ?? '';
  const location = useLocation();
  const backUrl = location.state?.previousPage ?? '/';
  return (
    <Stack>
      <PageHeader backUrl={backUrl} title="Profile" />
      <Profile userId={userId} />
    </Stack>
  );
}
