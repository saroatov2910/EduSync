import React, { useState, useEffect, type ChangeEvent, type KeyboardEvent } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  List,
  ListItem,
  Button,
  Tooltip
} from '@mui/material';
import AiIcon from './icons/AiIcon';
import '../cssRules/Body.css';
import { pipeline, type TextGenerationPipeline } from '@xenova/transformers';

type Message = { role: 'user' | 'assistant'; content: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<TextGenerationPipeline | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    (async () => {
      const p = await pipeline('text-generation', 'gpt2', { quantized: true });
      setChat(p);
    })();
  }, []);

  const send = async () => {
    if (!input.trim() || !chat) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    const out = await chat(input, { max_length: 64 });
    const reply = Array.isArray(out)
      ? (out[0].generated_texts?.[0] ?? '')
      : (out.generated_texts?.[0] ?? '');
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
  };

  return (
    <>
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
          <Box sx={{ p: 2 }}>
            <List sx={{ maxHeight: 300, overflow: 'auto', mb: 2 }}>
              {messages.map((msg, i) => (
                <ListItem key={i}>
                  <strong>{msg.role === 'user' ? 'אתה:' : 'בוט:'}</strong>&nbsp;{msg.content}
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                label="הקלד הודעה…"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button variant="contained" onClick={send} disabled={!chat}>
                {chat ? 'שלח' : 'טוען…'}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}