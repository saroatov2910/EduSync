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
          a.status,
          a.appointmentId
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
    setAppointments([...appointments, newAppointment]);
    localStorage.setItem('appointments', JSON.stringify([...appointments, newAppointment]));
  };

  const handleDelete = (id: number) => {
    const updated = appointments.filter(a => a.appointmentId !== id);
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    alert("פגישה נמחקה!");
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        פגישות
      </Typography>
      <Button onClick={addRandomAppointment} variant="contained" sx={{ mb: 2 }}>
        הוסף פגישה אקראית
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <th>appointmentId</th>
            <th>requestId</th>
            <th>appointmentDate</th>
            <th>appointmentTime</th>
            <th>appointmentType</th>
            <th>location</th>
            <th>status</th>
            <th>פעולות</th>
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
              <TableCell>
                <Button component={Link} to={`/forms/appointment/${a.appointmentId}`} sx={{ mr: 1 }}>
                  ערוך
                </Button>
                <Button color="error" onClick={() => handleDelete(a.appointmentId)}>
                  מחק
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AppointmentTable;