
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table, TableBody, TableCell, TableHead, TableRow,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import Appointment from '../classAppointment/Appointment';
import '../cssRules/index.css';

const STORAGE_KEY = 'appointments';

const AppointmentTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((a: any) => Appointment.fromPlain(a));
        setAppointments(parsed);
      } catch {
        setAppointments([]);
      }
    } else {
      // Seed demo data
      setAppointments([
        new Appointment({
          studentId: 101,
          requestId: 1,
          appointmentDate: new Date('2025-08-20'),
          appointmentTime: '10:30',
          appointmentType: 'פרונטלי',
          location: '101',
          status: 'מתוכננת',
          appointmentId: 1001,
        }),
        new Appointment({
          studentId: 102,
          requestId: 2,
          appointmentDate: new Date('2025-08-21'),
          appointmentTime: '14:00',
          appointmentType: 'זום',
          location: 'https://zoom.us/j/123456789',
          status: 'מתוכננת',
          appointmentId: 1002,
        }),
      ]);
    }
  }, []);

  // Persist whenever appointments change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const addRandomAppointment = () => {
    // Create a new random appointment
    const newAppointment = new Appointment({
      studentId: 100 + Math.floor(Math.random() * 100),
      requestId: Math.floor(Math.random() * 1000),
      appointmentDate: new Date(),
      appointmentTime: '12:00',
      appointmentType: Math.random() > 0.5 ? 'זום' : 'פרונטלי',
      location: Math.random() > 0.5 ? 'https://zoom.us/j/987654321' : '103',
      status: 'מתוכננת',
    });

    setAppointments(prev => [...prev, newAppointment]);
  };

  const handleDelete = (id: number) => {
    const updated = appointments.filter(a => a.appointmentId !== id);
    setAppointments(updated);
    alert('פגישה נמחקה!');
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
            {/* Use MUI TableCell for headers (not raw <th>) */}
            <TableCell>appointmentId</TableCell>
            <TableCell>requestId</TableCell>
            <TableCell>appointmentDate</TableCell>
            <TableCell>appointmentTime</TableCell>
            <TableCell>appointmentType</TableCell>
            <TableCell>location</TableCell>
            <TableCell>status</TableCell>
            <TableCell>פעולות</TableCell>
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
                <Button
                  component={Link}
                  to={`/forms/appointment/${a.appointmentId}`}
                  sx={{ mr: 1 }}
                  variant="outlined"
                  size="small"
                >
                  ערוך
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDelete(a.appointmentId)}
                  variant="outlined"
                  size="small"
                >
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
