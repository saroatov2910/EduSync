// src/components/componentsForms/RequestForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { Request, RequestProps } from '../../classRequest/Request';
import { RequestStatus, RequestTopic } from '../../RequestStatus';
import '../../cssRules/index.css';

const RequestForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem('requests');
      if (saved) {
        const parsed = JSON.parse(saved);
        const request = parsed.find((r: any) => r.requestId === Number(id));
        if (request) {
          setFormData({
            studentId: request.studentId,
            firstName: request.firstName || 'Demo',
            lastName: request.lastName || 'Student',
            email: request.email || 'demo@example.com',
            mobile: request.mobile || '0501234567',
            major: request.major || 'General',
            requestId: request.requestId,
            requestTopic: request.requestTopic || 'General',
            requestText: request.requestText,
            requestDate: new Date(request.requestDate),
            reqStatus: request.reqStatus || 'פתוחה',
            handlerId: request.handlerId || 1,
          });
        }
      }
    }
  }, [id]);

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
    const saved = localStorage.getItem('requests');
    let updatedRequests = saved ? JSON.parse(saved) : [];
    if (id) {
      updatedRequests = updatedRequests.map((r: any) =>
        r.requestId === Number(id) ? formData : r
      );
    } else {
      updatedRequests.push(formData);
    }
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
    setErrors([]);
    alert('פנייה נשמרה!');
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'עדכון פנייה' : 'יצירת פנייה חדשה'}
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
        <TextField label="שם פרטי" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth />
        <TextField label="שם משפחה" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth />
        <TextField label="דוא״ל" name="email" value={formData.email} onChange={handleChange} fullWidth />
        <TextField label="נייד" name="mobile" value={formData.mobile} onChange={handleChange} fullWidth />
        <TextField label="תואר/חוג" name="major" value={formData.major} onChange={handleChange} fullWidth />
        <TextField
          label="מזהה פנייה"
          name="requestId"
          type="number"
          value={formData.requestId}
          onChange={handleChange}
          fullWidth
          disabled={!!id}
        />
        <TextField
          label="נושא הפנייה"
          name="requestTopic"
          value={formData.requestTopic}
          onChange={handleChange}
          fullWidth
        />
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