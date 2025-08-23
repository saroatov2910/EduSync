import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Student from '../classStudent/Student';

export default function StudentForm() {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    major: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = new Student({
      StudentId: Number(formData.studentId),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobile: formData.mobile,
      major: formData.major
    });
    const validationErrors = student.validate();
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    const students = JSON.parse(localStorage.getItem('students_v1') || '[]');
    localStorage.setItem('students_v1', JSON.stringify([...students, student]));
    alert('סטודנט נוסף בהצלחה!');
    setFormData({ studentId: '', firstName: '', lastName: '', email: '', mobile: '', major: '' });
    setErrors([]);
  };

  return (
    <Box sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h5">טופס סטודנט</Typography>
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
          label="שם פרטי"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="שם משפחה"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="דוא״ל"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="נייד"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="חוג"
          name="major"
          value={formData.major}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
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