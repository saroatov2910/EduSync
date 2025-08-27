import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';

export default function HomePage() {
  useEffect(() => {
    // seed אם ריק: לפחות 10 לכל ישות
    const ensure = (key: string, factory: () => any[]) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(factory()));
    };

    ensure('students_v1', () => Array.from({ length: 10 }, (_, i) => ({
      StudentId: 100000 + i, firstName: Student${i+1}, lastName: 'Demo',
      email: student${i+1}@example.com, mobile: 05${Math.floor(10000000 + Math.random()*89999999)},
      major: ['CS','Economics','Biology'][i%3],
    })));

    ensure('care_handlers_v1', () => Array.from({ length: 10 }, (_, i) => ({
      handlerId: 1000 + i, name: Handler ${i+1}, role: i%2 ? 'מזכירות' : 'מרצה',
      email: handler${i+1}@uni.ac.il, responsibility: ['בדיקת עבודות','פניות סטודנטים','ניהול קורסים'][i%3],
    })));

    ensure('requests', () => Array.from({ length: 10 }, (_, i) => ({
      requestId: 2000 + i, studentId: 100000 + i, requestTopic: ['General','Academic','Administrative'][i%3],
      requestText: בקשה ${i+1}, requestDate: new Date(), reqStatus: 'Open', handlerId: 1000 + (i%10),
    })));

    ensure('appointments', () => Array.from({ length: 10 }, (_, i) => ({
      appointmentId: 3000 + i, studentId: 100000 + i, requestId: 2000 + i,
      appointmentDate: new Date(Date.now() + i*86400000), appointmentTime: ${10+(i%6)}:30,
      appointmentType: i%2 ? 'זום' : 'פרונטלי', location: i%2 ? 'https://zoom.us/j/123' : ${101+i},
      status: 'מתוכננת',
    })));

    ensure('feedbacks', () => Array.from({ length: 10 }, (_, i) => ({
      feedbackId: 4000 + i, studentId: 100000 + i, grade: (i%5)+1, comment: הערה ${i+1},
      createdBy: 'Student', feedbackDate: new Date(), requestId: 2000 + i, requestTopic: 'General',
      requestText: פידבק ${i+1}, requestDate: new Date(), reqStatus: 'Open', handlerId: 1000 + (i%10),
      firstName:'', lastName:'', email:'', mobile:'', major:'',
    })));

    ensure('msgs', () => Array.from({ length: 10 }, (_, i) => ({
      msgId: 5000 + i, createdBy: 'Student', requestId: 2000 + i, requestText: הודעה ${i+1}, requestDate: new Date(),
    })));
  }, []);

  return (
    <Container sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h4" gutterBottom>דף הבית</Typography>
      <Typography>ברוכים הבאים! נתוני דמו ייטענו אוטומטית אם ה-localStorage ריק.</Typography>
    </Container>
  );
}