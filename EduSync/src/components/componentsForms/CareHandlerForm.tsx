import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CareHandler from '../../classCareHandler/CareHandle';

export default function CareHandlerForm() {
  const [formData, setFormData] = useState({
    handlerId: '',
    name: '',
    role: 'מרצה' as 'מרצה' | 'מזכירות',
    email: '',
    responsibility: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    setFormData({ ...formData, [e.target.name as string]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const careHandler = new CareHandler(
      Number(formData.handlerId),
      formData.name,
      formData.role,
      formData.email,
      formData.responsibility
    );
    const validationErrors = careHandler.validate();
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    const handlers = JSON.parse(localStorage.getItem('care_handlers_v1') || '[]');
    localStorage.setItem('care_handlers_v1', JSON.stringify([...handlers, careHandler]));
    alert('גורם מטפל נוסף בהצלחה!');
    setFormData({ handlerId: '', name: '', role: 'מרצה', email: '', responsibility: '' });
    setErrors([]);
  };

  return (
    <Box sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h5">טופס גורם מטפל</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="מספר מזהה"
          name="handlerId"
          value={formData.handlerId}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="שם"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>תפקיד</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <MenuItem value="מרצה">מרצה</MenuItem>
            <MenuItem value="מזכירות">מזכירות</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="דוא״ל"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="תחום אחריות"
          name="responsibility"
          value={formData.responsibility}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
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