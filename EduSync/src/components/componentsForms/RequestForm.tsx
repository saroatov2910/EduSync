import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase'; // adjust your firebase import

interface RequestFormData {
  title: string;
  description?: string;
  handlerId?: string;
}

export default function RequestForm() {
  const [formData, setFormData] = useState<RequestFormData>({ title: '', description: '', handlerId: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const saveRequest = httpsCallable(functions, 'saveRequest');
      await saveRequest(formData);
      alert('Request saved!');
      setFormData({ title: '', description: '', handlerId: '' });
    } catch (err) {
      console.error(err);
      alert('Error saving request');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Title" name="title" value={formData.title} onChange={handleChange} />
      <TextField label="Description" name="description" value={formData.description} onChange={handleChange} />
      <TextField label="Handler ID" name="handlerId" value={formData.handlerId} onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        Save Request
      </Button>
    </Box>
  );
}
