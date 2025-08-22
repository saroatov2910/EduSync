// src/components/UserAppointments.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Appointment } from '../classAppointment/Appointment';
import '../cssRules/index.css';

const UserAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      const parsed = JSON.parse(saved).map((a: any) =>
        new Appointment(
          a.studentId,
          a.requestId,
          new Date(a.appointmentDate),
          a.appointmentTime,
          a.appointmentType,
          a.location,
          a.status,
          a.appointmentId
        )
      );
      setAppointments(parsed.filter(a => a.StudentId === 101));
    }
  }, []);

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        התורים שלי
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מזהה פגישה</TableCell>
            <TableCell>מזהה בקשה</TableCell>
            <TableCell>תאריך</TableCell>
            <TableCell>שעה</TableCell>
            <TableCell>סוג</TableCell>
            <TableCell>מיקום</TableCell>
            <TableCell>סטטוס</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map(a => (
            <TableRow key={a.appointmentId}>
              <TableCell>{a.appointmentId}</TableCell>
              <TableCell>{a.requestId}</TableCell>
              <TableCell>{new Date(a.appointmentDate).toLocaleDateString()}</TableCell>
              <TableCell>{a.appointmentTime}</TableCell>
              <TableCell>{a.appointmentType}</TableCell>
              <TableCell>{a.location}</TableCell>
              <TableCell>{a.status}</TableCell>
            </TableRow>
          ))}
          {appointments.length === 0 && (
            <TableRow>
              <TableCell colSpan={7}>אין תורים זמינים</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserAppointments;