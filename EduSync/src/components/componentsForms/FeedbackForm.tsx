import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Feedback, { FeedbackProps } from '../classFeedback/Feedback';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    studentId: '',
    comment: '',
    grade: 1
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    setFormData({ ...formData, [e.target.name as string]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.comment.length > 300) {
      setErrors(['הערות חייבות להיות עד 300 תווים']);
      return;
    }
    const feedbackProps: FeedbackProps = {
      studentId: Number(formData.studentId),
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      major: '',
      requestId: Math.floor(Math.random() * 1000),
      requestTopic: 'General' as any,
      requestText: formData.comment,
      requestDate: new Date(),
      reqStatus: 'Open' as any,
      handlerId: 1,
      feedbackId: Math.floor(Math.random() * 1000),
      grade: formData.grade as any,
      comment: formData.comment,
      createdBy: 'Student' as any,
      feedbackDate: new Date()
    };
    const feedback = new Feedback(feedbackProps);
    const validationErrors = feedback.validate();
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    localStorage.setItem('feedbacks', JSON.stringify([...feedbacks, feedbackProps]));
    alert('משוב נוסף בהצלחה!');
    setFormData({ studentId: '', comment: '', grade: 1 });
    setErrors([]);
  };

  return (
    <Box sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h5">טופס משוב</Typography>
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
        <TextField
          label="הערות"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>ציון</InputLabel>
          <Select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5].map(g => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </Select>
        </FormControl>
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