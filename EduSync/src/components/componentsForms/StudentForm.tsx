import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Student from '../../classStudent/Student';
import SaveSnackbar from '../Snackbar';
import { safeParse , readLS , writeLS } from '../../Functions/Utils'; 

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
  const [saved, setSaved] = useState(false);

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
    
    const students = readLS('students_v1', [] as any[]);
    writeLS('students_v1', [...students, student]);

    setFormData({ studentId: '', firstName: '', lastName: '', email: '', mobile: '', major: '' });
    setErrors([]);
    setSaved(true);
  };

  return (
    <Box sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h4" gutterBottom>טופס סטודנט</Typography>
      <form onSubmit={handleSubmit} aria-label="טופס הזנת סטודנט">
        <TextField label="מספר סטודנט" name="studentId" value={formData.studentId} onChange={handleChange} required fullWidth margin="normal" inputProps={{ inputMode: 'numeric', 'aria-label': 'מספר סטודנט' }} />
        <TextField label="שם פרטי" name="firstName" value={formData.firstName} onChange={handleChange} required fullWidth margin="normal" inputProps={{ 'aria-label': 'שם פרטי' }} />
        <TextField label="שם משפחה" name="lastName" value={formData.lastName} onChange={handleChange} required fullWidth margin="normal" inputProps={{ 'aria-label': 'שם משפחה' }} />
        <TextField label="דוא״ל" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth margin="normal" inputProps={{ 'aria-label': 'דוא״ל' }} />
        <TextField label="נייד" name="mobile" value={formData.mobile} onChange={handleChange} required fullWidth margin="normal" inputProps={{ 'aria-label': 'נייד' }} />
        <TextField label="חוג" name="major" value={formData.major} onChange={handleChange} required fullWidth margin="normal" inputProps={{ 'aria-label': 'חוג' }} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }} aria-label="שמור סטודנט">שלח</Button>
        {errors.length > 0 && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.join(', ')}
          </Typography>
        )}
      </form>

      <SaveSnackbar open={saved} onClose={() => setSaved(false)} message={`סטודנט נוסף בהצלחה!`} />
    </Box>
  );
}
