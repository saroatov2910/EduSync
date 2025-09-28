import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase'; // adjust your firebase import

interface AppointmentFormData {
  date: string;
  studentId?: string;
  notes?: string;
}

export default function AppointmentForm() {
  const [formData, setFormData] = useState<AppointmentFormData>({ date: '', studentId: '', notes: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const saveAppointment = httpsCallable(functions, 'saveAppointment');
      await saveAppointment(formData);
      alert('Appointment saved!');
      setFormData({ date: '', studentId: '', notes: '' });
    } catch (err) {
      console.error(err);
      alert('Error saving appointment');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Date" name="date" type="datetime-local" value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
      <TextField label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} />
      <TextField label="Notes" name="notes" value={formData.notes} onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        Save Appointment
      </Button>
    </Box>
  );
}
