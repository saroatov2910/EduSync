import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { Request, RequestProps } from '../classRequest/Request';
import { RequestStatus, RequestTopic } from '../RequestStatus';

const RequestForm: React.FC = () => {
  const [formData, setFormData] = useState<RequestProps>({
    studentId: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    major: '',
    requestId: 0,
    requestTopic: '' as RequestTopic,
    requestText: '',
    requestDate: new Date(),
    reqStatus: 'פתוחה' as RequestStatus,
    handlerId: 0,
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const request = new Request(formData);
    const validationErrors = request.validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    localStorage.setItem('requests', JSON.stringify([...JSON.parse(localStorage.getItem('requests') || '[]'), formData]));
    setErrors([]);
    alert('פנייה נשמרה!');
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        יצירת פנייה חדשה
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="מספר סטודנט"
          name="studentId"
          type="number"
          value={formData.studentId}
          onChange={handleChange}
          fullWidth
        />
        <TextField label="נושא הפנייה" name="requestTopic" value={formData.requestTopic} onChange={handleChange} fullWidth />
        <TextField
          label="תיאור הפנייה"
          name="requestText"
          value={formData.requestText}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          label="סטטוס"
          name="reqStatus"
          select
          value={formData.reqStatus}
          onChange={handleChange}
          fullWidth
        >
          {['פתוחה', 'בטיפול', 'סגורה'].map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="מזהה גורם מטפל"
          name="handlerId"
          type="number"
          value={formData.handlerId}
          onChange={handleChange}
          fullWidth
        />
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

export default RequestForm;