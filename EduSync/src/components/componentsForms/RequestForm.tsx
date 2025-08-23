import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Request from '../classRequest/Request';
import CareHandler from '../classCareHandler/CareHandle';

export default function RequestForm() {
  const [formData, setFormData] = useState({
    studentId: '',
    requestTopic: 'General' as 'General' | 'Academic' | 'Administrative',
    requestText: '',
    handlerId: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [handlers, setHandlers] = useState<CareHandler[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('care_handlers_v1') || '[]');
    setHandlers(saved.map(CareHandler.from));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    setFormData({ ...formData, [e.target.name as string]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const request = new Request({
      studentId: Number(formData.studentId),
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      major: '',
      requestId: Math.floor(Math.random() * 1000),
      requestTopic: formData.requestTopic,
      requestText: formData.requestText,
      requestDate: new Date(),
      reqStatus: 'Open' as any,
      handlerId: Number(formData.handlerId)
    });
    const validationErrors = request.validate();
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    localStorage.setItem('requests', JSON.stringify([...requests, { ...request, file: file?.name }]));
    alert('בקשה נוספה בהצלחה!');
    setFormData({ studentId: '', requestTopic: 'General', requestText: '', handlerId: '' });
    setFile(null);
    setErrors([]);
  };

  return (
    <Box sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h5">טופס בקשה</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="מספר סטודנט"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>נושא הבקשה</InputLabel>
          <Select
            name="requestTopic"
            value={formData.requestTopic}
            onChange={handleChange}
            required
          >
            <MenuItem value="General">כללי</MenuItem>
            <MenuItem value="Academic">אקדמי</MenuItem>
            <MenuItem value="Administrative">מנהלי</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="תיאור הבקשה"
          name="requestText"
          value={formData.requestText}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>גורם מטפל</InputLabel>
          <Select
            name="handlerId"
            value={formData.handlerId}
            onChange={handleChange}
            required
          >
            {handlers.map(h => (
              <MenuItem key={h.handlerId} value={h.handlerId}>
                {h.name} ({h.role})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
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