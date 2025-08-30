import { safeParse , readLS , writeLS } from '../Functions/Utils'; 
import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button,
  Table, TableBody, TableCell, TableHead, TableRow,
  TableContainer, Paper, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import Snackbar from '../components/Snackbar';

type Row = {
  msgId: number;
  createdBy: string;
  requestId: number;
  requestText: string;
  requestDate: string | Date;
};

const LS_KEY = 'msgs';

export default function ContactMsgManagement() {
  const [rows, setRows] = useState<Row[]>([]);
  const [snack, setSnack] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = safeParse<any[]>(raw, []);
    const normalized: Row[] = parsed.map((m, i) => ({
      msgId: Number(m.msgId ?? 4000 + i),
      createdBy: String(m.createdBy ?? 'Student'),
      requestId: Number(m.requestId ?? 0),
      requestText: String(m.requestText ?? ''),
      requestDate: m.requestDate ? new Date(m.requestDate) : new Date(),
    }));
    setRows(normalized);
  }, []);

  const fmt = (d: string | Date) => {
    const dt = typeof d === 'string' ? new Date(d) : d;
    return isNaN(dt.getTime()) ? '' : dt.toLocaleString();
  };

  const handleDelete = (id: number) => {
    const next = rows.filter(r => r.msgId !== id);
    setRows(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    setSnack(`הודעה ${id} נמחקה`);
  };

  const addRandom = () => {
    const newMsg: Row = {
      msgId: Math.floor(Math.random() * 100000),
      createdBy: 'Student',
      requestId: 100 + Math.floor(Math.random() * 900),
      requestText: 'הודעה חדשה',
      requestDate: new Date(),
    };
    const next = [...rows, newMsg];
    setRows(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    setSnack('הודעה נוספה');
  };

  return (
    <Container sx={{ direction: 'rtl', p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">ניהול הודעות משתמש</Typography>
        <Stack direction="row" spacing={1}>
          <Button onClick={addRandom} variant="outlined" aria-label="הוסף הודעה">הוסף הודעה</Button>
          {/* <Button component={Link} to="/forms#contactmsg-form" variant="contained">הוסף הודעה</Button> */}
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מס׳ הודעה</TableCell>
              <TableCell>נוצר ע״י</TableCell>
              <TableCell>מס׳ בקשה</TableCell>
              <TableCell>תוכן ההודעה</TableCell>
              <TableCell>תאריך</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((m) => (
              <TableRow key={m.msgId}>
                <TableCell>{m.msgId}</TableCell>
                <TableCell>{m.createdBy}</TableCell>
                <TableCell>{m.requestId}</TableCell>
                <TableCell>{m.requestText}</TableCell>
                <TableCell>{fmt(m.requestDate)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" component={Link} to="/forms#request-form" aria-label={`ערוך הודעה ${m.msgId}`}>ערוך</Button>
                    <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(m.msgId)} aria-label={`מחק הודעה ${m.msgId}`}>מחק</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow><TableCell colSpan={6} align="center">אין הודעות להצגה</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={!!snack} onClose={() => setSnack(null)} message={snack || ''} />
    </Container>
  );
}
