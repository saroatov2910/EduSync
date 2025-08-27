import React, { useEffect, useMemo, useState } from 'react';
import {
  Container, Typography, Button,
  Table, TableBody, TableCell, TableHead, TableRow,
  TableContainer, Paper, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import Snackbar from '../components/Snackbar';

type Row = {
  requestId: number;
  studentId: number;
  requestTopic: string;
  requestText: string;
  requestDate: string | Date;
  reqStatus: string;
  handlerId: number;
};

const LS_KEY = 'requests';

export default function RequestManagement() {
  const [rows, setRows] = useState<Row[]>([]);
  const [snack, setSnack] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return setRows([]);
    try {
      const parsed = JSON.parse(raw) as any[];
      const normalized: Row[] = parsed.map((r, i) => ({
        requestId: Number(r.requestId ?? 1000 + i),
        studentId: Number(r.studentId ?? r.StudentId ?? 0),
        requestTopic: String(r.requestTopic ?? 'General'),
        requestText: String(r.requestText ?? ''),
        requestDate: r.requestDate ? new Date(r.requestDate) : new Date(),
        reqStatus: String(r.reqStatus ?? 'Open'),
        handlerId: Number(r.handlerId ?? 0),
      }));
      setRows(normalized);
    } catch { setRows([]); }
  }, []);

  const fmt = (d: string | Date) => {
    const dt = typeof d === 'string' ? new Date(d) : d;
    return isNaN(dt.getTime()) ? '' : dt.toLocaleString();
  };

  const handleDelete = (id: number) => {
    const next = rows.filter(r => r.requestId !== id);
    setRows(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    setSnack(בקשה ${id} נמחקה);
  };

  const totals = useMemo(() => ({
    count: rows.length,
    byTopic: rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.requestTopic] = (acc[r.requestTopic] ?? 0) + 1;
      return acc;
    }, {}),
  }), [rows]);

  return (
    <Container sx={{ direction: 'rtl', p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
        <Typography variant="h5">ניהול בקשות</Typography>
        <Button component={Link} to="/forms#request-form" variant="contained">הוסף בקשה חדשה</Button>
      </Stack>

      <Typography variant="body2" sx={{ mb: 1 }}>
        סה״כ: {totals.count} | {Object.entries(totals.byTopic).map(([k,v]) => ${k}: ${v}).join(' | ') || '-'}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מס׳ בקשה</TableCell>
              <TableCell>מס׳ סטודנט</TableCell>
              <TableCell>נושא</TableCell>
              <TableCell>תיאור</TableCell>
              <TableCell>תאריך</TableCell>
              <TableCell>סטטוס</TableCell>
              <TableCell>גורם מטפל</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.requestId}>
                <TableCell>{r.requestId}</TableCell>
                <TableCell>{r.studentId}</TableCell>
                <TableCell>{r.requestTopic}</TableCell>
                <TableCell>{r.requestText}</TableCell>
                <TableCell>{fmt(r.requestDate)}</TableCell>
                <TableCell>{r.reqStatus}</TableCell>
                <TableCell>{r.handlerId}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" component={Link} to="/forms#request-form">ערוך</Button>
                    <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(r.requestId)}>מחק</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow><TableCell align="center" colSpan={8}>אין נתונים</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={!!snack} onClose={() => setSnack(null)} message={snack || ''} />
    </Container>
  );
}