// src/components/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from '@mui/material';
import { Request } from '../classRequest/Request';
import '../cssRules/index.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('requests');
    if (saved) {
      const parsed = JSON.parse(saved).map((r: any) =>
        new Request({
          requestId: r.requestId,
          studentId: r.studentId,
          firstName: r.firstName || 'Demo',
          lastName: r.lastName || 'Student',
          email: r.email || 'demo@example.com',
          mobile: r.mobile || '0501234567',
          major: r.major || 'General',
          requestTopic: r.requestTopic || 'General',
          requestText: r.requestText,
          requestDate: new Date(r.requestDate),
          reqStatus: r.reqStatus || 'פתוחה',
          handlerId: r.handlerId || 1,
        })
      );
      setRequests(parsed);
    } else {
      setRequests([
        new Request({
          requestId: 1,
          studentId: 101,
          firstName: 'דניאל',
          lastName: 'כהן',
          email: 'daniel.cohen@uni.ac.il',
          mobile: '0521234567',
          major: 'מדעי המחשב',
          requestTopic: 'רישום לקורס',
          requestText: 'בקשה לדוגמה',
          requestDate: new Date(),
          reqStatus: 'פתוחה',
          handlerId: 1,
        }),
      ]);
    }
  }, []);

  return (
    <Box component="main" sx={{ p: 2, direction: 'rtl' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        דף הבית
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">טפסים</Typography>
              <Typography variant="body2" color="text.secondary">
                מעבר למסכי הטפסים שהגדרתם בתכנון.
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate('/forms')} variant="contained">
                עבור לטפסים
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">ניהול</Typography>
              <Typography variant="body2" color="text.secondary">
                ניווט למסכי הניהול (טבלאות/CRUD).
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate('/management')} variant="contained">
                עבור לניהול
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
        פניות אחרונות
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="requests table">
          <TableHead>
            <TableRow>
              <TableCell>מזהה פנייה</TableCell>
              <TableCell>נושא</TableCell>
              <TableCell>סטטוס</TableCell>
              <TableCell>תאריך</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((r) => (
              <TableRow key={r.requestId}>
                <TableCell>{r.requestId}</TableCell>
                <TableCell>{r.requestTopic}</TableCell>
                <TableCell>{r.reqStatus}</TableCell>
                <TableCell>{r.requestDate.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {requests.length === 0 && (
              <TableRow><TableCell colSpan={4}>אין פניות</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HomePage;