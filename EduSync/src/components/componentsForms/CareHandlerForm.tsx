import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import CareHandler, { Role } from '../classCareHandler/CareHandle';

const CareHandlerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    handlerId: 0,
    name: '',
    role: '' as Role,
    email: '',
    responsibility: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const handler = new CareHandler(
      formData.handlerId,
      formData.name,
      formData.role,
      formData.email,
      formData.responsibility
    );
    const validationErrors = handler.validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    localStorage.setItem('care_handlers_v1', JSON.stringify([...JSON.parse(localStorage.getItem('care_handlers_v1') || '[]'), formData]));
    setErrors([]);
    alert('גורם מטפל נשמר!');
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        הוספת/עדכון גורם מטפל
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="מזהה גורם"
          name="handlerId"
          type="number"
          value={formData.handlerId}
          onChange={handleChange}
          fullWidth
        />
        <TextField label="שם" name="name" value={formData.name} onChange={handleChange} fullWidth />
        <TextField
          label="תפקיד"
          name="role"
          select
          value={formData.role}
          onChange={handleChange}
          fullWidth
        >
          {['מרצה', 'מזכירות'].map((role) => (
            <MenuItem key={role} value={role}>{role}</MenuItem>
          ))}
        </TextField>
        <TextField label="דוא״ל" name="email" value={formData.email} onChange={handleChange} fullWidth />
        <TextField label="תחום אחריות" name="responsibility" value={formData.responsibility} onChange={handleChange} fullWidth />
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

export default CareHandlerForm;