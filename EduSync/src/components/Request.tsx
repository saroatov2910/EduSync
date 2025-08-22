// src/components/Request.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Request } from '../classRequest/Request';
import '../cssRules/index.css';

const RequestTable: React.FC = () => {
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

  const addRandomRequest = () => {
    const newRequest = new Request({
      requestId: Math.floor(Math.random() * 1000),
      studentId: 100 + Math.floor(Math.random() * 100),
      firstName: 'Demo',
      lastName: 'Student',
      email: 'demo@example.com',
      mobile: '0501234567',
      major: 'General',
      requestTopic: 'General',
      requestText: 'בקשה חדשה',
      requestDate: new Date(),
      reqStatus: 'פתוחה',
      handlerId: 1,
    });
    const errs = newRequest.validate();
    if (errs.length) return alert('שגיאות:\n' + errs.join('\n'));
    setRequests([...requests, newRequest]);
    localStorage.setItem('requests', JSON.stringify([...requests, newRequest]));
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        ניהול בקשות
      </Typography>
      <Button onClick={addRandomRequest} variant="contained" sx={{ mb: 2 }}>
        הוסף בקשה אקראית
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מזהה בקשה</TableCell>
            <TableCell>מספר סטודנט</TableCell>
            <TableCell>נושא</TableCell>
            <TableCell>תיאור</TableCell>
            <TableCell>סטטוס</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map(r => (
            <TableRow key={r.requestId}>
              <TableCell>{r.requestId}</TableCell>
              <TableCell>{r.StudentId}</TableCell>
              <TableCell>{r.requestTopic}</TableCell>
              <TableCell>{r.requestText}</TableCell>
              <TableCell>{r.reqStatus}</TableCell>
              <TableCell>
                <Button component={Link} to={`/forms/request/${r.requestId}`}>
                  ערוך
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {requests.length === 0 && (
            <TableRow><TableCell colSpan={6}>אין נתונים</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default RequestTable;