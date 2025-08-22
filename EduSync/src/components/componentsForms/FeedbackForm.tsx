// src/components/componentsForms/FeedbackForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { Feedback, FeedbackProps } from '../../classFeedback/Feedback';
import { RequestStatus, createdBy, grade } from '../../RequestStatus';
import '../../cssRules/index.css';

const FeedbackForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem('feedbacks');
      if (saved) {
        const parsed = JSON.parse(saved);
        const feedback = parsed.find((f: any) => f.feedbackId === Number(id));
        if (feedback) {
          setFormData({
            studentId: feedback.studentId,
            firstName: feedback.firstName || 'Demo',
            lastName: feedback.lastName || 'Student',
            email: feedback.email || 'demo.student@example.com',
            mobile: feedback.mobile || '0501234567',
            major: feedback.major || 'Computer Science',
            requestId: feedback.requestId || 1000 + Math.floor(Math.random() * 9000),
            requestTopic: feedback.requestTopic || 'General',
            requestText: feedback.comment,
            requestDate: new Date(feedback.requestDate || new Date()),
            reqStatus: feedback.reqStatus || 'פתוחה',
            handlerId: feedback.handlerId || 1,
            feedbackId: feedback.feedbackId,
            grade: feedback.grade || 100,
            comment: feedback.comment,
            createdBy: feedback.createdBy || 'Teacher',
            feedbackDate: new Date(feedback.feedbackDate || new Date()),
          });
        }
      }
    }
  }, [id]);

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
    const saved = localStorage.getItem('feedbacks');
    let updatedFeedbacks = saved ? JSON.parse(saved) : [];
    if (id) {
      updatedFeedbacks = updatedFeedbacks.map((f: any) =>
        f.feedbackId === Number(id) ? { ...formData, feedbackId: Number(id) } : f
      );
    } else {
      updatedFeedbacks.push({ ...formData, feedbackId: formData.feedbackId || Math.floor(Math.random() * 1000) });
    }
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
    setErrors([]);
    alert('משוב נשמר!');
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'עדכון משוב' : 'הוספת משוב'}
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
          disabled={!!id}
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