// src/components/Student.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Student from '../classStudent/Student';
import { students } from '../classStudent/studentsData';
import '../cssRules/index.css';

const StudentTable: React.FC = () => {
  const [data, setData] = useState<Student[]>(students);

  useEffect(() => {
    const raw = localStorage.getItem('students_v1');
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) setData(arr.map(Student.from));
    }
  }, []);

  const existingIds = useMemo(() => new Set(data.map(s => s.StudentId)), [data]);

  const addRandom = () => {
    const s = Student.random(existingIds);
    const errs = s.validate();
    if (errs.length) return alert('שגיאות:\n' + errs.join('\n'));
    setData(prev => [...prev, s]);
    localStorage.setItem('students_v1', JSON.stringify([...data, s]));
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        ניהול סטודנטים
      </Typography>
      <Button onClick={addRandom} variant="contained" sx={{ mb: 2 }}>
        הוסף סטודנט אקראי
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מספר סטודנט</TableCell>
            <TableCell>שם פרטי</TableCell>
            <TableCell>שם משפחה</TableCell>
            <TableCell>דוא״ל</TableCell>
            <TableCell>נייד</TableCell>
            <TableCell>תואר/חוג</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(s => (
            <TableRow key={s.StudentId}>
              <TableCell>{s.StudentId}</TableCell>
              <TableCell>{s.firstName}</TableCell>
              <TableCell>{s.lastName}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.mobile}</TableCell>
              <TableCell>{s.major}</TableCell>
              <TableCell>
                <Button component={Link} to={`/forms/student/${s.StudentId}`}>
                  ערוך
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow><TableCell colSpan={7}>אין נתונים</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default StudentTable;