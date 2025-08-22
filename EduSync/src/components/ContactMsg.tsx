// src/components/ContactMsg.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ContactMsg } from '../classContactMsg/ContactMsg';
import '../cssRules/index.css';

const ContactMsgTable: React.FC = () => {
  const [msgs, setMsgs] = useState<ContactMsg[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('msgs');
    if (saved) {
      const parsed = JSON.parse(saved).map((m: any) =>
        new ContactMsg({
          msgId: m.msgId,
          createdBy: m.createdBy || 'Student',
          requestId: m.requestId,
          requestText: m.requestText || m.message,
          requestDate: new Date(m.requestDate),
        })
      );
      setMsgs(parsed);
    } else {
      setMsgs([
        new ContactMsg({
          msgId: 1,
          createdBy: 'Student',
          requestId: 1,
          requestText: 'הודעה לדוגמה 1',
          requestDate: new Date(),
        }),
        new ContactMsg({
          msgId: 2,
          createdBy: 'Teacher',
          requestId: 2,
          requestText: 'הודעה לדוגמה 2',
          requestDate: new Date(),
        }),
      ]);
    }
  }, []);

  const addRandomMsg = () => {
    const newMsg = new ContactMsg({
      msgId: Math.floor(Math.random() * 1000),
      createdBy: Math.random() > 0.5 ? 'Student' : 'Teacher',
      requestId: Math.floor(Math.random() * 1000),
      requestText: 'הודעה חדשה',
      requestDate: new Date(),
    });
    const errs = newMsg.validate();
    if (errs.length) return alert('שגיאות:\n' + errs.join('\n'));
    setMsgs([...msgs, newMsg]);
    localStorage.setItem('msgs', JSON.stringify([...msgs, newMsg]));
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        ניהול הודעות
      </Typography>
      <Button onClick={addRandomMsg} variant="contained" sx={{ mb: 2 }}>
        הוסף הודעה אקראית
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מזהה הודעה</TableCell>
            <TableCell>נוצר על ידי</TableCell>
            <TableCell>מזהה בקשה</TableCell>
            <TableCell>תוכן</TableCell>
            <TableCell>תאריך</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {msgs.map(m => (
            <TableRow key={m.msgId}>
              <TableCell>{m.msgId}</TableCell>
              <TableCell>{m.createdBy}</TableCell>
              <TableCell>{m.requestId}</TableCell>
              <TableCell>{m.requestText}</TableCell>
              <TableCell>{m.requestDate.toLocaleDateString()}</TableCell>
              <TableCell>
                <Button component={Link} to={`/forms/contactmsg/${m.msgId}`}>
                  ערוך
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {msgs.length === 0 && (
            <TableRow><TableCell colSpan={6}>אין נתונים</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ContactMsgTable;