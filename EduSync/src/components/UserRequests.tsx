// src/components/UserRequests.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Request } from '../classRequest/Request';
import '../cssRules/index.css';

const UserRequests: React.FC = () => {
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
      setRequests(parsed.filter(r => r.StudentId === 101));
    }
  }, []);

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        הבקשות שלי
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מזהה בקשה</TableCell>
            <TableCell>נושא</TableCell>
            <TableCell>תיאור</TableCell>
            <TableCell>תאריך</TableCell>
            <TableCell>סטטוס</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map(r => (
            <TableRow key={r.requestId}>
              <TableCell>{r.requestId}</TableCell>
              <TableCell>{r.requestTopic}</TableCell>
              <TableCell>{r.requestText}</TableCell>
              <TableCell>{r.requestDate.toLocaleDateString()}</TableCell>
              <TableCell>{r.reqStatus}</TableCell>
            </TableRow>
          ))}
          {requests.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>אין בקשות זמינות</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserRequests;