import {
  createContext,
  forwardRef,
  useMemo,
  useState,
  useContext,
  ReactNode,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AlertType = 'error' | 'success';

type SnackbarContent = {
  type: AlertType;
  message: string;
};

type Context = {
  showSnackbar: (type: AlertType, message: string) => void;
};

const SnackbarContext = createContext<Context>({ showSnackbar: () => {} });

export function SnackbarProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [snackbarContent, setSnackbarContent] =
    useState<SnackbarContent | null>(null);
  const context = useMemo<Context>(
    () => ({
      showSnackbar: (type, message) => {
        setSnackbarContent({ type, message });
      },
    }),
    [],
  );
  return (
    <>
      <SnackbarContext.Provider value={context}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar
        open={snackbarContent !== null}
        autoHideDuration={6000}
        onClose={() => setSnackbarContent(null)}
      >
        {snackbarContent ? (
          <Alert
            onClose={() => setSnackbarContent(null)}
            severity={snackbarContent.type}
            sx={{ width: '100%' }}
          >
            {snackbarContent.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}
