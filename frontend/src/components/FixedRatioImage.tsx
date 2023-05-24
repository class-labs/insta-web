import { styled } from '@mui/material/styles';

type Props = {
  width?: number | '100%';
  aspectRatio?: [number, number];
  borderRadius?: number;
};

export const FixedRatioImage = styled('img')<Props>((props) => {
  const { width = '100%', aspectRatio = [1, 1], borderRadius = 0 } = props;
  const [a, b] = aspectRatio;
  return {
    objectFit: 'cover',
    aspectRatio: `${a} / ${b}`,
    width,
    borderRadius,
  };
});
