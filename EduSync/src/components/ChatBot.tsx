import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AiIcon from './icons/AiIcon';
import '../cssRules/Body.css';   // ← הייבוא

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* כפתור עגול צף בפינה שמאלית-תחתונה */}
      <Fab
        className="chatbot-fab"      // ← קלאס הפוזיציה
        color="primary"
        size="medium"
        onClick={() => setOpen(true)}
        aria-label="פתח צ׳אט AI"
      >
        <AiIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>צ׳אט בוט AI</DialogTitle>
        <DialogContent>
          {/* כאן תטמיע את ממשק השיחה שלך */}
        </DialogContent>
      </Dialog>
    </>
  );
}