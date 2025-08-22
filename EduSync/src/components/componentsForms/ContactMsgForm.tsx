import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { ContactMsg, ContactMsgProps } from '../classContactMsg/ContactMsg';
import { createdBy } from '../RequestStatus';

const ContactMsgForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactMsgProps>({
    msgId: 0,
    createdBy: 'Student' as createdBy,
    requestId: 0,
    requestText: '',
    requestDate: new Date(),
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const msg = new ContactMsg(formData);
    try {
      msg.validate();
      localStorage.setItem('msgs', JSON.stringify([...JSON.parse(localStorage.getItem('msgs') || '[]'), formData]));
      setErrors([]);
      alert('הודעה נשמרה!');
    } catch (e: any) {
      setErrors([e.message || 'שגיאה בטופס']);
    }
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        שליחת הודעה
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="מזהה הודעה"
          name="msgId"
          type="number"
          value={formData.msgId}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="נוצר על ידי"
          name="createdBy"
          select
          value={formData.createdBy}
          onChange={handleChange}
          fullWidth
        >
          {['Student', 'Teacher'].map((creator) => (
            <MenuItem key={creator} value={creator}>{creator}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="מזהה בקשה"
          name="requestId"
          type="number"
          value={formData.requestId}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="תוכן ההודעה"
          name="requestText"
          value={formData.requestText}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
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

export default ContactMsgForm;