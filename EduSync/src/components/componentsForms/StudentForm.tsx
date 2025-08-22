import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { Student, StudentProps } from '../classStudent/Student';
import { students } from '../classStudent/studentsData';

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<StudentProps>({
    StudentId: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    major: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const student = new Student(formData);
    const validationErrors = student.validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    students.push(student);
    localStorage.setItem('students_v1', JSON.stringify(students));
    setErrors([]);
    alert('סטודנט נשמר!');
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        הוספת/עדכון סטודנט
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="מספר סטודנט"
          name="StudentId"
          type="number"
          value={formData.StudentId}
          onChange={handleChange}
          fullWidth
        />
        <TextField label="שם פרטי" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth />
        <TextField label="שם משפחה" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth />
        <TextField label="דוא״ל" name="email" value={formData.email} onChange={handleChange} fullWidth />
        <TextField label="טלפון נייד" name="mobile" value={formData.mobile} onChange={handleChange} fullWidth />
        <TextField label="תואר/חוג" name="major" value={formData.major} onChange={handleChange} fullWidth />
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

export default StudentForm;