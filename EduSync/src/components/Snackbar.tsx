import * as React from 'react';
import { Snackbar as MUISnackbar, Alert } from '@mui/material';

export default function Snackbar({
  open,
  onClose,
  message = `בוצע בהצלחה!`,
  duration = 2000,
  severity = 'success',
}: {
  open: boolean;
  onClose: () => void;
  message?: string;
  duration?: number;
  severity?: 'success' | 'info' | 'warning' | 'error';
}) {
  return (
    <MUISnackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      aria-label="הודעת מערכת"
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
}
