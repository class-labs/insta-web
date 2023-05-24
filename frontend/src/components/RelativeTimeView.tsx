import { formatRelativeTime } from '../support/formatRelativeTime';
import { Typography } from '@mui/material';

type Props = {
  timestamp: string;
};

export function RelativeTimeView(props: Props) {
  const { timestamp } = props;
  return (
    <Typography fontSize={12} sx={{ opacity: 0.4 }}>
      {formatRelativeTime(timestamp)}
    </Typography>
  );
}
