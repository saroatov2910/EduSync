// src/components/componentsForms/StudentForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { Student, StudentProps } from '../../classStudent/Student';
import { students } from '../../classStudent/studentsData';
import '../../cssRules/index.css';

const StudentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<StudentProps>({
    StudentId: 0,
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    major: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem('students_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        const student = parsed.find((s: any) => s.StudentId === Number(id));
        if (student) {
          setFormData({
            StudentId: student.StudentId,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            mobile: student.mobile,
            major: student.major,
          });
        }
      }
    }
  }, [id]);

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
    const saved = localStorage.getItem('students_v1');
    let updatedStudents = saved ? JSON.parse(saved) : students;
    if (id) {
      updatedStudents = updatedStudents.map((s: any) =>
        s.StudentId === Number(id) ? formData : s
      );
    } else {
      updatedStudents.push(formData);
    }
    localStorage.setItem('students_v1', JSON.stringify(updatedStudents));
    setErrors([]);
    alert('סטודנט נשמר!');
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'עדכון סטודנט' : 'הוספת סטודנט'}
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="מספר סטודנט"
          name="StudentId"
          type="number"
          value={formData.StudentId}
          onChange={handleChange}
          fullWidth
          disabled={!!id}
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