// src/components/componentsForms/AppointmentForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { Appointment } from '../../classAppointment/Appointment';
import { RequestStatus, AppointmentType } from '../../RequestStatus';
import '../../cssRules/index.css';

const AppointmentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    studentId: 0,
    requestId: 0,
    appointmentId: 0,
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: '' as AppointmentType,
    location: '',
    status: 'מתוכננת' as RequestStatus,
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem('appointments');
      if (saved) {
        const parsed = JSON.parse(saved);
        const appointment = parsed.find((a: any) => a.appointmentId === Number(id));
        if (appointment) {
          setFormData({
            studentId: appointment.studentId,
            requestId: appointment.requestId,
            appointmentId: appointment.appointmentId,
            appointmentDate: new Date(appointment.appointmentDate).toISOString().slice(0, 10),
            appointmentTime: appointment.appointmentTime,
            appointmentType: appointment.appointmentType,
            location: appointment.location,
            status: appointment.status,
          });
        }
      }
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    try {
      const appointment = new Appointment(
        formData.studentId,
        formData.requestId,
        new Date(formData.appointmentDate),
        formData.appointmentTime,
        formData.appointmentType,
        formData.location,
        formData.status
      );
      const validationErrors = appointment.validate();
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }
      const saved = localStorage.getItem('appointments');
      let updatedAppointments = saved ? JSON.parse(saved) : [];
      if (id) {
        updatedAppointments = updatedAppointments.map((a: any) =>
          a.appointmentId === Number(id) ? formData : a
        );
      } else {
        updatedAppointments.push(formData);
      }
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      setErrors([]);
      alert('פגישה נשמרה!');
    } catch (e: any) {
      setErrors([e.message || 'שגיאה בטופס']);
    }
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'עדכון פגישה' : 'קביעת פגישה'}
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="מספר סטודנט"
          name="studentId"
          type="number"
          value={formData.studentId}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="מזהה בקשה"
          name="requestId"
          type="number"
          value={formData.requestId}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="מזהה פגישה"
          name="appointmentId"
          type="number"
          value={formData.appointmentId}
          onChange={handleChange}
          fullWidth
          disabled={!!id}
        />
        <TextField
          label="תאריך פגישה"
          name="appointmentDate"
          type="date"
          value={formData.appointmentDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="שעה"
          name="appointmentTime"
          type="time"
          value={formData.appointmentTime}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="סוג פגישה"
          name="appointmentType"
          select
          value={formData.appointmentType}
          onChange={handleChange}
          fullWidth
        >
          {['פרונטלי', 'זום'].map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="מיקום"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="סטטוס"
          name="status"
          select
          value={formData.status}
          onChange={handleChange}
          fullWidth
        >
          {['מתוכננת', 'בוטלה', 'הושלמה'].map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleSubmit}>
          שמור
        </Button>
        {errors.length > 0 && (
          <Typography color="error">{errors.join(', ')}</Typography>
        )}
      </Box>
    </Container>
  );
};

export default AppointmentForm;