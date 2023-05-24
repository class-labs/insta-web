import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

export function BottomNav() {
  const location = useLocation();
  const activeTabIndex = location.pathname === '/' ? 0 : 1;
  return (
    <BottomNavigation
      showLabels
      sx={{
        position: 'sticky',
        bottom: 0,
        height: 64,
        backgroundColor: 'white',
        borderTop: '1px solid #e8e8e8',
      }}
      value={activeTabIndex}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/my-profile"
        label="Profile"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
}
