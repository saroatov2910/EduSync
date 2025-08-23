import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Appointment from '../classAppointment/Appointment';

export default function AppointmentForm() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    requestId: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'פרונטלי' as 'פרונטלי' | 'זום',
    location: '',
    status: 'מתוכננת' as 'מתוכננת' | 'מתקיימת' | 'בוטלה'
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const appointment = appointments.find((a: any) => a.appointmentId === Number(id));
      if (appointment) {
        setFormData({
          requestId: appointment.requestId,
          appointmentDate: new Date(appointment.appointmentDate).toISOString().slice(0, 10),
          appointmentTime: appointment.appointmentTime,
          appointmentType: appointment.appointmentType,
          location: appointment.location,
          status: appointment.status
        });
      }
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    setFormData({ ...formData, [e.target.name as string]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointment = new Appointment(
      0, // studentId (not used in form, set to 0)
      Number(formData.requestId),
      formData.requestText || '',
      new Date(),
      formData.status,
      id ? Number(id) : Math.floor(Math.random() * 1000),
      new Date(formData.appointmentDate),
      formData.appointmentTime,
      formData.appointmentType,
      formData.location,
      formData.status
    );
    const validationErrors = appointment.validate();
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    if (id) {
      const updated = appointments.map((a: any) => a.appointmentId === Number(id) ? appointment : a);
      localStorage.setItem('appointments', JSON.stringify(updated));
    } else {
      localStorage.setItem('appointments', JSON.stringify([...appointments, appointment]));
    }
    alert(id ? 'פגישה עודכנה!' : 'פגישה נוספה!');
    setErrors([]);
  };

  return (
    <Box sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h5">{id ? 'ערוך פגישה' : 'טופס פגישה'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="מספר בקשה"
          name="requestId"
          value={formData.requestId}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="תאריך"
          name="appointmentDate"
          type="date"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="שעה"
          name="appointmentTime"
          type="time"
          value={formData.appointmentTime}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>סוג פגישה</InputLabel>
          <Select
            name="appointmentType"
            value={formData.appointmentType}
            onChange={handleChange}
            required
          >
            <MenuItem value="פרונטלי">פרונטלי</MenuItem>
            <MenuItem value="זום">זום</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="מיקום"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>סטטוס</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="מתוכננת">מתוכננת</MenuItem>
            <MenuItem value="מתקיימת">מתקיימת</MenuItem>
            <MenuItem value="בוטלה">בוטלה</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          שלח
        </Button>
        {errors.length > 0 && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.join(', ')}
          </Typography>
        )}
      </form>
    </Box>
  );
}