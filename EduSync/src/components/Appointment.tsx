// src/components/Appointment.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appointment } from '../classAppointment/Appointment';
import '../cssRules/index.css';

const AppointmentTable: React.FC = () => {
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
          a.status
        )
      );
      setAppointments(parsed);
    } else {
      setAppointments([
        new Appointment(101, 1, new Date("2025-08-20"), "10:30", "פרונטלי", "101", "מתוכננת"),
        new Appointment(102, 2, new Date("2025-08-21"), "14:00", "זום", "https://zoom.us/j/123456789", "מתוכננת")
      ]);
    }
  }, []);

  const addRandomAppointment = () => {
    const newAppointment = new Appointment(
      100 + Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 1000),
      new Date(),
      "12:00",
      Math.random() > 0.5 ? "זום" : "פרונטלי",
      Math.random() > 0.5 ? "https://zoom.us/j/987654321" : "103",
      "מתוכננת"
    );
    const errs = newAppointment.validate();
    if (errs.length) return alert('שגיאות:\n' + errs.join('\n'));
    setAppointments([...appointments, newAppointment]);
    localStorage.setItem('appointments', JSON.stringify([...appointments, newAppointment]));
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        ניהול פגישות
      </Typography>
      <Button onClick={addRandomAppointment} variant="contained" sx={{ mb: 2 }}>
        הוסף פגישה אקראית
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מזהה סטודנט</TableCell>
            <TableCell>מזהה בקשה</TableCell>
            <TableCell>תאריך</TableCell>
            <TableCell>שעה</TableCell>
            <TableCell>סוג</TableCell>
            <TableCell>מיקום</TableCell>
            <TableCell>סטטוס</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map(a => (
            <TableRow key={a.appointmentId}>
              <TableCell>{a.StudentId}</TableCell>
              <TableCell>{a.requestId}</TableCell>
              <TableCell>{new Date(a.appointmentDate).toLocaleDateString()}</TableCell>
              <TableCell>{a.appointmentTime}</TableCell>
              <TableCell>{a.appointmentType}</TableCell>
              <TableCell>{a.location}</TableCell>
              <TableCell>{a.status}</TableCell>
              <TableCell>
                <Button component={Link} to={`/forms/appointment/${a.appointmentId}`}>
                  ערוך
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {appointments.length === 0 && (
            <TableRow><TableCell colSpan={8}>אין נתונים</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AppointmentTable;