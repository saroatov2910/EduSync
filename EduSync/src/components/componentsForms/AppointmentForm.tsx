import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import Appointment from '../../classAppointment/Appointment';

// Narrow string unions for better typing
type AppointmentType = 'פרונטלי' | 'זום';
type AppointmentStatus = 'מתוכננת' | 'מתקיימת' | 'בוטלה';

interface FormState {
  requestId: string;
  appointmentDate: string;   // yyyy-mm-dd
  appointmentTime: string;   // HH:mm
  appointmentType: AppointmentType;
  location: string;
  status: AppointmentStatus;
}

export default function AppointmentForm() {
  const { id } = useParams<{ id: string }>();

  // Initialize state with explicit generic to avoid unnecessary assertions.
  const [formData, setFormData] = useState<FormState>({
    requestId: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'פרונטלי',
    location: '',
    status: 'מתוכננת',
  });

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Load existing appointment for edit mode
    if (!id) return;
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]') as any[];
    const found = appointments.find((a) => Number(a.appointmentId) === Number(id));
    if (found) {
      setFormData({
        requestId: String(found.requestId ?? ''),
        appointmentDate: new Date(found.appointmentDate).toISOString().slice(0, 10),
        appointmentTime: String(found.appointmentTime ?? ''),
        appointmentType: (found.appointmentType ?? 'פרונטלי') as AppointmentType,
        location: String(found.location ?? ''),
        status: (found.status ?? 'מתוכננת') as AppointmentStatus,
      });
    }
  }, [id]);

  // Text inputs (TextField): name + value come from e.target
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Select inputs (MUI Select): use SelectChangeEvent
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof FormState]: value as string }));
  };

  // Simple inline validation (since Appointment class does not expose validate())
  const validateForm = (): string[] => {
    const v: string[] = [];
    if (!formData.requestId.trim()) v.push('Request ID is required');
    if (!formData.appointmentDate) v.push('Date is required');
    if (!formData.appointmentTime) v.push('Time is required');
    if (!formData.location.trim()) v.push('Location is required');
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validateForm();
    if (errs.length) {
      setErrors(errs);
      return;
    }

    const appointment = new Appointment({
      studentId: 0, // not managed in this form
      requestId: Number(formData.requestId),
      appointmentDate: new Date(formData.appointmentDate),
      appointmentTime: formData.appointmentTime,
      appointmentType: formData.appointmentType,
      location: formData.location,
      status: formData.status,
      appointmentId: id ? Number(id) : undefined,
    });

    const stored = JSON.parse(localStorage.getItem('appointments') || '[]') as any[];

    if (id) {
      const updated = stored.map((a: any) =>
        Number(a.appointmentId) === Number(id) ? appointment : a
      );
      localStorage.setItem('appointments', JSON.stringify(updated));
      alert('פגישה עודכנה!');
    } else {
      localStorage.setItem('appointments', JSON.stringify([...stored, appointment]));
      alert('פגישה נוספה!');
    }

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
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="תאריך"
          name="appointmentDate"
          type="date"
          value={formData.appointmentDate}
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
          // Use standard props, avoid deprecated InputLabelProps
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="שעה"
          name="appointmentTime"
          type="time"
          value={formData.appointmentTime}
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="appointmentType-label">סוג פגישה</InputLabel>
          <Select
            labelId="appointmentType-label"
            label="סוג פגישה"
            name="appointmentType"
            value={formData.appointmentType}
            onChange={handleSelectChange}
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
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">סטטוס</InputLabel>
          <Select
            labelId="status-label"
            label="סטטוס"
            name="status"
            value={formData.status}
            onChange={handleSelectChange}
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
