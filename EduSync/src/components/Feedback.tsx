import { safeParse , readLS , writeLS } from '../Functions/Utils'; 
import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button,
  Table, TableBody, TableCell, TableHead, TableRow,
  TableContainer, Paper, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import Feedback from '../classFeedback/Feedback';
import type { RequestTopic, RequestStatus, createdBy, grade } from '../RequestStatus';

const LS_KEY = 'feedbacks';

export default function FeedbackManagement() {
  const [rows, setRows] = useState<Feedback[]>([]);
  const [snack, setSnack] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    const parsed = safeParse<any[]>(saved, []).map(
      (f) =>
        new Feedback({
          studentId: Number(f.studentId),
          firstName: f.firstName ?? '',
          lastName: f.lastName ?? '',
          email: f.email ?? '',
          mobile: f.mobile ?? '',
          major: f.major ?? '',
          requestId: Number(f.requestId ?? Math.floor(Math.random() * 1000)),
          requestTopic: (f.requestTopic ?? 'General') as RequestTopic,
          requestText: f.requestText ?? f.comment ?? '',
          requestDate: new Date(f.requestDate ?? Date.now()),
          reqStatus: (f.reqStatus ?? 'Open') as RequestStatus,
          handlerId: Number(f.handlerId ?? 1),
          feedbackId: Number(f.feedbackId ?? Math.floor(Math.random() * 1000)),
          grade: Number(f.grade ?? 1) as grade,
          comment: f.comment ?? '',
          createdBy: (f.createdBy ?? 'Student') as createdBy,
          feedbackDate: new Date(f.feedbackDate ?? Date.now()),
        })
    );
    setRows(parsed);
  }, []);

  const handleDelete = (id: number) => {
    const next = rows.filter((f) => f.feedbackId !== id);
    setRows(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    setSnack(`משוב ${id} נמחק`);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(LS_KEY, JSON.stringify(rows));
    setSnack('משובים נשמרו');
  };

  return (
    <Container sx={{ direction: 'rtl', p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">ניהול משובים</Typography>
        <Stack direction="row" spacing={1}>
          <Button onClick={saveToLocalStorage} variant="outlined" aria-label="שמור משובים">שמור</Button>
          <Button component={Link} to="/forms#feedback-form" variant="contained" aria-label="הוסף משוב">הוסף משוב</Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מס׳ משוב</TableCell>
              <TableCell>מס׳ סטודנט</TableCell>
              <TableCell>ציון</TableCell>
              <TableCell>הערות</TableCell>
              <TableCell>נוצר ע״י</TableCell>
              <TableCell>תאריך</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((f) => (
              <TableRow key={f.feedbackId}>
                <TableCell>{f.feedbackId}</TableCell>
                <TableCell>{(f as any).StudentId ?? (f as any).studentId}</TableCell>
                <TableCell>{f.grade}</TableCell>
                <TableCell>{f.comment}</TableCell>
                <TableCell>{f.createdBy}</TableCell>
                <TableCell>{new Date(f.feedbackDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button component={Link} to="/forms#feedback-form" variant="outlined" size="small" aria-label={`ערוך משוב ${f.feedbackId}`}>ערוך</Button>
                    <Button color="error" onClick={() => handleDelete(f.feedbackId)} variant="outlined" size="small" aria-label={`מחק משוב ${f.feedbackId}`}>מחק</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow><TableCell colSpan={7} align="center">אין נתונים</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={!!snack} onClose={() => setSnack(null)} message={snack || ''} />
    </Container>
  );
}
