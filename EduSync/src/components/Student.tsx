import React, { useEffect, useState, useMemo } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Student from "../classStudent/Student";
import "../cssRules/index.css";

const LS_STUDENTS = "students_v1";

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_STUDENTS);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setStudents(arr.map(Student.from));
      }
    } catch (e) {
      console.error("failed to load students", e);
    }
  }, []);

  const existingIds = useMemo(() => new Set(students.map(s => s.StudentId)), [students]);

  const addRandom = () => {
    const s = Student.random(existingIds);
    const errs = s.validate();
    if (errs.length) return alert("שגיאות:\n" + errs.join("\n"));
    setStudents(prev => [...prev, s]);
  };

  const save = () => {
    try {
      localStorage.setItem(LS_STUDENTS, JSON.stringify(students));
      alert("נשמר ל-localStorage");
    } catch {
      alert("שגיאה בשמירה");
    }
  };

  const handleDelete = (id: number) => {
    const updated = students.filter(s => s.StudentId !== id);
    setStudents(updated);
    localStorage.setItem(LS_STUDENTS, JSON.stringify(updated));
    alert("סטודנט נמחק!");
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        ניהול סטודנטים
      </Typography>
      <Button onClick={addRandom} variant="contained" sx={{ mr: 2 }}>
        הוסף סטודנט אקראי
      </Button>
      <Button onClick={save} variant="contained">
        שמור ל-localStorage
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>StudentId</TableCell>
            <TableCell>firstName</TableCell>
            <TableCell>lastName</TableCell>
            <TableCell>email</TableCell>
            <TableCell>mobile</TableCell>
            <TableCell>major</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(s => (
            <TableRow key={s.StudentId}>
              <TableCell>{s.StudentId}</TableCell>
              <TableCell>{s.firstName}</TableCell>
              <TableCell>{s.lastName}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.mobile}</TableCell>
              <TableCell>{s.major}</TableCell>
              <TableCell>
                <Button component={Link} to={`/forms/student/${s.StudentId}`} sx={{ mr: 1 }}>
                  ערוך
                </Button>
                <Button color="error" onClick={() => handleDelete(s.StudentId)}>
                  מחק
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {students.length === 0 && (
            <TableRow><TableCell colSpan={7}>אין נתונים</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default StudentTable;