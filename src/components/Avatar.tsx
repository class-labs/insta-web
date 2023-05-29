import { useState } from 'react';
import { Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { FixedRatioImage } from './FixedRatioImage';

type Props = {
  src: string;
  size?: number;
  onClick?: () => void;
};

type State = 'show-image' | 'show-placeholder';

export function Avatar(props: Props) {
  const { src, size = 32, onClick } = props;
  const iconSizeRatio = size > 48 ? 0.6 : 0.75;
  const iconSize = size * iconSizeRatio;
  const [state, setState] = useState<State>(
    src ? 'show-image' : 'show-placeholder',
  );
  if (state === 'show-image') {
    return (
      <FixedRatioImage
        width={size}
        borderRadius={size / 2}
        src={src}
        onError={() => {
          setState('show-placeholder');
        }}
        onClick={onClick}
        alt="avatar"
      />
    );
  } else {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#e8e8e8',
        }}
        onClick={onClick}
      >
        <PersonIcon
          sx={{ width: iconSize, height: iconSize, color: 'white' }}
        />
      </Stack>
    );
  }
}
