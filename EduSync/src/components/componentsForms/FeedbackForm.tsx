import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { Feedback, FeedbackProps } from '../classFeedback/Feedback';
import { RequestStatus, createdBy, grade } from '../RequestStatus';

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackProps>({
    studentId: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    major: '',
    requestId: 0,
    requestTopic: '' as any,
    requestText: '',
    requestDate: new Date(),
    reqStatus: 'פתוחה' as RequestStatus,
    handlerId: 0,
    feedbackId: 0,
    grade: 0 as grade,
    comment: '',
    createdBy: 'Student' as createdBy,
    feedbackDate: new Date(),
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const feedback = new Feedback(formData);
    const validationErrors = feedback.validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    localStorage.setItem('feedbacks', JSON.stringify([...JSON.parse(localStorage.getItem('feedbacks') || '[]'), {
      feedbackId: formData.feedbackId,
      studentId: formData.studentId,
      comment: formData.comment,
    }]));
    setErrors([]);
    alert('משוב נשמר!');
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        הוספת משוב
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
        <TextField
          label="מזהה משוב"
          name="feedbackId"
          type="number"
          value={formData.feedbackId}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="ציון"
          name="grade"
          type="number"
          value={formData.grade}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="הערה"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
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

export default FeedbackForm;