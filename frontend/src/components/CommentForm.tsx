import { useState, FormEvent, RefObject } from 'react';
import { CircularProgress, IconButton, Stack, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type Props = {
  inputRef: RefObject<HTMLInputElement>;
  autoFocus?: boolean;
  sending: boolean;
  onSubmit: (text: string) => void;
};

export function CommentForm(props: Props) {
  const { inputRef, autoFocus, sending, onSubmit } = props;
  const [text, setText] = useState('');
  return (
    <Stack
      component="form"
      direction="row"
      alignItems="center"
      spacing={1}
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (text.length && !sending) {
          onSubmit(text);
          setText('');
        }
      }}
    >
      <Stack flex={1}>
        <TextField
          inputRef={inputRef}
          autoFocus={autoFocus}
          placeholder="Comment"
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
      </Stack>
      {sending ? (
        <CircularProgress />
      ) : (
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      )}
    </Stack>
  );
}
