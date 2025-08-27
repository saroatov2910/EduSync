import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import Feedback from '../../classFeedback/Feedback';
import type { FeedbackProps } from '../../classFeedback/Feedback';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    studentId: '',
    comment: '',
    grade: 1, // keep as number
  });

  const [errors, setErrors] = useState<string[]>([]);

  // Handle text inputs (studentId, comment)
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle grade select (MUI SelectChangeEvent<number>)
  const handleGradeChange = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    setFormData(prev => ({ ...prev, grade: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.comment.length > 300) {
      setErrors(['הערות חייבות להיות עד 300 תווים']);
      return;
    }

    // Build props for Feedback class (keep fields aligned with your model)
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
      grade: formData.grade as any, // keep as any if your model expects a different enum/type
      comment: formData.comment,
      createdBy: 'Student' as any,
      feedbackDate: new Date(),
    };

    const feedback = new Feedback(feedbackProps);
    const validationErrors = (feedback as any).validate?.() ?? [];
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
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="הערות"
          name="comment"
          value={formData.comment}
          onChange={handleTextChange}
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>ציון</InputLabel>
          <Select<number>
            name="grade"
            value={formData.grade}
            onChange={handleGradeChange}
            required
            label="ציון"
          >
            {[1, 2, 3, 4, 5].map(g => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
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
