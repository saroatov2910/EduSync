import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Student } from '../classStudent/Student';
import { students } from '../classStudent/studentsData';

const Management: React.FC = () => {
  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        מסכי ניהול
      </Typography>
      <Typography variant="h5" gutterBottom>
        סטודנטים
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מספר סטודנט</TableCell>
            <TableCell>שם</TableCell>
            <TableCell>דוא״ל</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student: Student) => (
            <TableRow key={student.StudentId}>
              <TableCell>{student.StudentId}</TableCell>
              <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Button component={Link} to={`/forms/student/${student.StudentId}`}>
                  ערוך
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button component={Link} to="/forms/student" variant="contained" sx={{ mt: 2 }}>
        הוסף סטודנט
      </Button>
    </Container>
  );
};

export default Management;