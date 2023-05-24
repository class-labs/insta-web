import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackButton from '@mui/icons-material/ArrowBack';

type Props = {
  backUrl?: string;
  title: string;
  rightIcon?: ReactNode;
};

export function PageHeader(props: Props) {
  const { backUrl, title, rightIcon } = props;
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      sx={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        borderBottom: '1px solid #E8E8E8',
        zIndex: 1,
      }}
      padding={1}
    >
      <Box sx={{ width: 40, height: 40 }}>
        {backUrl ? (
          <IconButton
            sx={{ color: 'black' }}
            onClick={() => {
              navigate(backUrl);
            }}
          >
            <ArrowBackButton />
          </IconButton>
        ) : null}
      </Box>
      <Stack flex={1} alignItems="center" justifyContent="center">
        <Typography fontSize="large" fontWeight={700}>
          {title}
        </Typography>
      </Stack>
      <Box sx={{ width: 40, height: 40 }}>{rightIcon}</Box>
    </Stack>
  );
}
