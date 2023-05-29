import { useState, ReactElement } from 'react';
import { Button, CircularProgress, Stack } from '@mui/material';

import { API_HOST } from '../support/constants';
import { FixedRatioImage } from './FixedRatioImage';

// TODO: Do not hard-code this
const CDN_HOST = 'https://skrnds.web-api.dev';

type State =
  | { state: 'no-photo' }
  | { state: 'uploading' }
  | { state: 'photo'; url: string };

type Props = {
  buttonText?: string;
  buttonVariant?: 'text' | 'contained' | 'outlined';
  onChange: (photoUrl: string) => void;
  renderPhoto?: (src: string) => ReactElement;
};

export function PhotoUpload(props: Props) {
  const { buttonText, buttonVariant, onChange, renderPhoto } = props;
  const [state, setState] = useState<State>({ state: 'no-photo' });
  switch (state.state) {
    case 'no-photo': {
      return (
        <FilePicker
          buttonText={buttonText ?? 'Choose a Photo'}
          buttonVariant={buttonVariant ?? 'contained'}
          onFileSelect={async (file) => {
            setState({ state: 'uploading' });
            const response = await fetch(API_HOST + '/images', {
              method: 'POST',
              headers: { 'content-type': file.type },
              body: file,
            });
            const result = await response.json();
            const url = String(result.url);
            setState({ state: 'photo', url });
            onChange(url);
          }}
        />
      );
    }
    case 'uploading': {
      return <CircularProgress />;
    }
    case 'photo': {
      const { url } = state;
      const src = url.startsWith('/') ? CDN_HOST + url : url;
      return renderPhoto ? renderPhoto(src) : <FixedRatioImage src={src} />;
    }
  }
}

function FilePicker(props: {
  buttonText: string;
  buttonVariant: 'text' | 'contained' | 'outlined';
  onFileSelect: (file: File) => void;
}) {
  const { buttonText, buttonVariant, onFileSelect } = props;
  return (
    <Stack>
      <Button component="label" htmlFor="file-picker" variant={buttonVariant}>
        {buttonText}
      </Button>
      <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
        <input
          id="file-picker"
          type="file"
          onChange={(event) => {
            const files = event.target.files;
            const firstFile = files ? files[0] : null;
            if (firstFile) {
              onFileSelect(firstFile);
            }
          }}
        />
      </div>
    </Stack>
  );
}
