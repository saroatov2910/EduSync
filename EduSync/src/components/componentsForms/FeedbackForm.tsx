import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase'; // adjust your firebase import

interface FeedbackFormData {
  text: string;
  studentId?: string;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>({ text: '', studentId: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const saveFeedback = httpsCallable(functions, 'saveFeedback');
      await saveFeedback(formData);
      alert('Feedback saved!');
      setFormData({ text: '', studentId: '' });
    } catch (err) {
      console.error(err);
      alert('Error saving feedback');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Feedback" name="text" value={formData.text} onChange={handleChange} />
      <TextField label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        Save Feedback
      </Button>
    </Box>
  );
}
