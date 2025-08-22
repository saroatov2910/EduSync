// src/components/componentsForms/CareHandlerForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import CareHandler, { Role } from '../../classCareHandler/CareHandle';
import '../../cssRules/index.css';

const CareHandlerForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    handlerId: 0,
    name: '',
    role: '' as Role,
    email: '',
    responsibility: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem('care_handlers_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        const handler = parsed.find((h: any) => h.handlerId === Number(id));
        if (handler) {
          setFormData({
            handlerId: handler.handlerId,
            name: handler.name,
            role: handler.role || 'מרצה',
            email: handler.email,
            responsibility: handler.responsibility,
          });
        }
      }
    }
  }, [id]);

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
    const saved = localStorage.getItem('care_handlers_v1');
    let updatedHandlers = saved ? JSON.parse(saved) : [];
    if (id) {
      updatedHandlers = updatedHandlers.map((h: any) =>
        h.handlerId === Number(id) ? formData : h
      );
    } else {
      updatedHandlers.push(formData);
    }
    localStorage.setItem('care_handlers_v1', JSON.stringify(updatedHandlers));
    setErrors([]);
    alert('גורם מטפל נשמר!');
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'עדכון גורם מטפל' : 'הוספת גורם מטפל'}
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="מזהה גורם"
          name="handlerId"
          type="number"
          value={formData.handlerId}
          onChange={handleChange}
          fullWidth
          disabled={!!id}
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