import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function SaveSnackbar({
  open,
  onClose,
  message = 'נשמר בהצלחה!',
  duration = 2000,
}: {
  open: boolean;
  onClose: () => void;
  message?: string;
  duration?: number;
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}