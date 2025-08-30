// src/components/Student.tsx
import { useEffect, useState } from 'react';
import {
  Container, Typography, Button,
  Table, TableBody, TableCell, TableHead, TableRow,
  TableContainer, Paper, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import Snackbar from '../components/Snackbar';

type Row = {
  StudentId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  major: string;
};

const LS_KEY = 'students_v1';

export default function StudentManagement() {
  const [rows, setRows] = useState<Row[]>([]);
  const [snack, setSnack] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      setRows(raw ? (JSON.parse(raw) as Row[]) : []);
    } catch {
      setRows([]);
    }
  }, []);

  const handleDelete = (studentId: number) => {
    const next = rows.filter(r => r.StudentId !== studentId);
    setRows(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    // ✅ חשוב: טקסט בתוך backticks/גרשיים
    setSnack(`סטודנט ${studentId} נמחק`);
  };

  return (
    <Container sx={{ direction: 'rtl', p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">ניהול סטודנטים</Typography>
        <Button component={Link} to="/forms#student-form" variant="contained">הוסף סטודנט</Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מס׳ סטודנט</TableCell>
              <TableCell>שם פרטי</TableCell>
              <TableCell>שם משפחה</TableCell>
              <TableCell>דוא״ל</TableCell>
              <TableCell>נייד</TableCell>
              <TableCell>חוג</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((s) => (
              <TableRow key={s.StudentId}>
                <TableCell>{s.StudentId}</TableCell>
                <TableCell>{s.firstName}</TableCell>
                <TableCell>{s.lastName}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.mobile}</TableCell>
                <TableCell>{s.major}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" component={Link} to="/forms#student-form">ערוך</Button>
                    <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(s.StudentId)}>מחק</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow><TableCell align="center" colSpan={7}>אין נתונים</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={!!snack} onClose={() => setSnack(null)} message={snack || ''} />
    </Container>
  );
}
