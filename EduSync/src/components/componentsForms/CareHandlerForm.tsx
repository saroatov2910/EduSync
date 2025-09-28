import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase'; // adjust your firebase import

interface CareHandlerFormData {
  name: string;
  email?: string;
}

export default function CareHandlerForm() {
  const [formData, setFormData] = useState<CareHandlerFormData>({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const saveCareHandler = httpsCallable(functions, 'saveCareHandler');
      await saveCareHandler(formData);
      alert('Care Handler saved!');
      setFormData({ name: '', email: '' });
    } catch (err) {
      console.error(err);
      alert('Error saving Care Handler');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        Save Care Handler
      </Button>
    </Box>
  );
}
