import React, { useEffect, useState } from 'react'; // Adjusted React import for conciseness
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid, // This now refers to the modern Grid component (previously Grid2 in v6)
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface Row {
  id: number | string;
  title: string;
  date?: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const fromFeedbacks = safeParse(localStorage.getItem('feedbacks')) as
      | Array<{ feedbackId?: number; comment?: string; feedbackDate?: string }>
      | null;

    if (fromFeedbacks?.length) {
      setRows(
        fromFeedbacks.slice(0, 10).map((f, i) => ({
          id: f.feedbackId ?? i + 1,
          title: f.comment ?? 'Feedback',
          date: f.feedbackDate ?? '',
        })),
      );
      return;
    }

    const fromStudents = safeParse(localStorage.getItem('students_v1')) as
      | Array<{ id?: number | string; fullName?: string }>
      | null;

    if (fromStudents?.length) {
      setRows(
        fromStudents.slice(0, 10).map((s, i) => ({
          id: s.id ?? i + 1,
          title: s.fullName ?? 'Student',
        })),
      );
      return;
    }

    setRows([
      { id: 1, title: 'Welcome to EduSync', date: new Date().toISOString().slice(0, 10) },
      { id: 2, title: 'Use the buttons to navigate' },
      { id: 3, title: 'Load data appears here' },
    ]);
  }, []);

  function safeParse(value: string | null) {
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  return (
    <Box component="main" sx={{ p: 2, direction: 'rtl' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        דף הבית
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Updated Grid usage for modern MUI versions (v6/v7+). */}
        {/* Child Grids automatically act as items. Use 'size' prop for breakpoints. */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">טפסים</Typography>
              <Typography variant="body2" color="text.secondary">
                מעבר למסכי הטפסים שהגדרתם בתכנון.
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate('/forms')} variant="contained">
                מעבר לטפסים
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">ניהול</Typography>
              <Typography variant="body2" color="text.secondary">
                ניווט למסכי הניהול (טבלאות/CRUD).
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate('/management')} variant="contained">
                מעבר לניהול
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">עזרה</Typography>
              <Typography variant="body2" color="text.secondary">
                קישורים ומידע מסייע למשתמשים.
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate('/help')} color="secondary" variant="outlined">
                פתח עזרה
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mb: 1 }}>
        עדכונים אחרונים
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="home table">
          <TableHead>
            <TableRow>
              <TableCell>מזהה</TableCell>
              <TableCell>כותרת</TableCell>
              <TableCell>תאריך</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.title}</TableCell>
                <TableCell>{r.date ?? '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
