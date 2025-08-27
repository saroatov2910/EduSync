import React, { useEffect, useMemo, useState } from 'react';
import {
  Container, Typography, Button,
  Table, TableBody, TableCell, TableHead, TableRow,
  TableContainer, Paper, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import CareHandler from '../classCareHandler/CareHandle';

const LS_KEY = 'care_handlers_v1';

export default function CareHandlerManagement() {
  const [rows, setRows] = useState<CareHandler[]>([]);
  const [snack, setSnack] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return setRows([]);
      const arr = JSON.parse(raw);
      setRows(Array.isArray(arr) ? arr.map(CareHandler.from) : []);
    } catch { setRows([]); }
  }, []);

  const existingIds = useMemo(() => new Set(rows.map(h => h.handlerId)), [rows]);

  const addRandom = () => {
    const h = CareHandler.random(existingIds);
    const errs = h.validate();
    if (errs.length) return setSnack(errs.join(', '));
    const next = [...rows, h];
    setRows(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    setSnack('גורם מטפל אקראי נוסף');
  };

  const handleDelete = (id: number) => {
    const next = rows.filter(h => h.handlerId !== id);
    setRows(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    setSnack(גורם מטפל ${id} נמחק);
  };

  return (
    <Container sx={{ direction: 'rtl', p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">ניהול גורמים מטפלים</Typography>
        <Stack direction="row" spacing={1}>
          <Button onClick={addRandom} variant="outlined">הוסף אקראי</Button>
          <Button component={Link} to="/forms#carehandler-form" variant="contained">הוסף חדש</Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מס׳ מזהה</TableCell>
              <TableCell>שם</TableCell>
              <TableCell>תפקיד</TableCell>
              <TableCell>דוא״ל</TableCell>
              <TableCell>תחום אחריות</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(h => (
              <TableRow key={h.handlerId}>
                <TableCell>{h.handlerId}</TableCell>
                <TableCell>{h.name}</TableCell>
                <TableCell>{h.role}</TableCell>
                <TableCell>{h.email}</TableCell>
                <TableCell>{h.responsibility}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button component={Link} to="/forms#carehandler-form" variant="outlined" size="small">ערוך</Button>
                    <Button onClick={() => handleDelete(h.handlerId)} color="error" variant="outlined" size="small">מחק</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow><TableCell align="center" colSpan={6}>אין נתונים</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={!!snack} onClose={() => setSnack(null)} message={snack || ''} severity="success" />
    </Container>
  );
}