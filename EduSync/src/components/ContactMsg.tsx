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
          createdBy: m.createdBy || m.name,
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
          createdBy: 'דוד',
          requestId: 101,
          requestText: "הודעה לדוגמה 1",
          requestDate: new Date(),
        }),
        new ContactMsg({
          msgId: 2,
          createdBy: 'שרה',
          requestId: 102,
          requestText: "הודעה לדוגמה 2",
          requestDate: new Date(),
        })
      ]);
    }
  }, []);

  const addRandomMsg = () => {
    const newMsg = new ContactMsg({
      msgId: Math.floor(Math.random() * 1000),
      createdBy: "שם אקראי",
      requestId: Math.floor(Math.random() * 100),
      requestText: "הודעה חדשה",
      requestDate: new Date(),
    });
    setMsgs([...msgs, newMsg]);
    localStorage.setItem('msgs', JSON.stringify([...msgs, newMsg]));
  };

  const handleDelete = (id: number) => {
    const updated = msgs.filter(m => m.msgId !== id);
    setMsgs(updated);
    localStorage.setItem('msgs', JSON.stringify(updated));
    alert("הודעה נמחקה!");
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        צור קשר
      </Typography>
      <Button onClick={addRandomMsg} variant="contained" sx={{ mb: 2 }}>
        הוסף הודעה אקראית
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>msgId</TableCell>
            <TableCell>createdBy</TableCell>
            <TableCell>requestId</TableCell>
            <TableCell>requestText</TableCell>
            <TableCell>requestDate</TableCell>
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
                <Button component={Link} to={`/forms/contactmsg/${m.msgId}`} sx={{ mr: 1 }}>
                  ערוך
                </Button>
                <Button color="error" onClick={() => handleDelete(m.msgId)}>
                  מחק
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ContactMsgTable;