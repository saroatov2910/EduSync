import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, Tooltip } from '@mui/material';
 import AiIcon from './icons/AiIcon';
 import '../cssRules/Body.css';  

export default function ChatBot() {
  const [open, setOpen] = useState(false);

    return (
     <>
       {/* bottom left corner */}
      <Tooltip title="פתח צ׳אט AI" arrow placement="top">
        <Fab
         className="chatbot-fab"      
         color="primary"
         size="medium"
         onClick={() => setOpen(true)}
         aria-label="פתח צ׳אט AI"
       >
         <AiIcon />
       </Fab>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>צ׳אט בוט AI</DialogTitle>
        <DialogContent>

         <ChatBot />
        </DialogContent>
      </Dialog>
    </>
  );
}