import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button,
  Table, TableBody, TableCell, TableHead, TableRow,
  TableContainer, Paper, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import Appointment from '../classAppointment/Appointment';
import { safeParse , readLS , writeLS } from '../Functions/Utils'; 

const LS_KEY = 'appointments';

export default function AppointmentManagement() {
  const [rows, setRows] = useState<Appointment[]>([]);
  const [snack, setSnack] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    const parsed = safeParse<any[]>(saved, []).map((a) =>
      (Appointment as any).fromPlain
        ? (Appointment as any).fromPlain(a)
        : Object.assign(new (Appointment as any)(), a)
    );
    setRows(parsed);
  }, []);

  const handleDelete = (id: number) => {
    const next = rows.filter(a => a.appointmentId !== id);
    setRows(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    setSnack(`פגישה ${id} נמחקה`);
  };

  return (
    <Container sx={{ direction: 'rtl', p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">ניהול פגישות</Typography>
        <Button component={Link} to="/forms#appointment-form" variant="contained" aria-label="הוסף פגישה">הוסף פגישה</Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מס׳ פגישה</TableCell>
              <TableCell>מס׳ בקשה</TableCell>
              <TableCell>תאריך</TableCell>
              <TableCell>שעה</TableCell>
              <TableCell>סוג</TableCell>
              <TableCell>מיקום</TableCell>
              <TableCell>סטטוס</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(a => (
              <TableRow key={a.appointmentId}>
                <TableCell>{a.appointmentId}</TableCell>
                <TableCell>{a.requestId}</TableCell>
                <TableCell>{new Date(a.appointmentDate as any).toLocaleDateString()}</TableCell>
                <TableCell>{a.appointmentTime}</TableCell>
                <TableCell>{a.appointmentType}</TableCell>
                <TableCell>{a.location}</TableCell>
                <TableCell>{a.status}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/forms/appointment/${a.appointmentId}`}
                      aria-label={`ערוך פגישה ${a.appointmentId}`}
                    >
                      ערוך
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(a.appointmentId)}
                      aria-label={`מחק פגישה ${a.appointmentId}`}
                    >
                      מחק
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={8}>אין נתונים</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={!!snack} onClose={() => setSnack(null)} message={snack || ''} />
    </Container>
  );
}
