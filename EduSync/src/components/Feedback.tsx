// src/components/Feedback.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Feedback, { FeedbackProps } from '../classFeedback/Feedback';
import '../cssRules/index.css';

function makeFeedbackProps(input: { feedbackId: number; studentId: number; comment: string }): FeedbackProps {
  const now = new Date();
  return {
    studentId: input.studentId,
    firstName: 'Demo',
    lastName: 'Student',
    email: 'demo.student@example.com',
    mobile: '0501234567',
    major: 'Computer Science',
    requestId: 1000 + Math.floor(Math.random() * 9000),
    requestTopic: 'General' as any,
    requestText: input.comment,
    requestDate: now,
    reqStatus: 'Open' as any,
    handlerId: 1,
    feedbackId: input.feedbackId,
    grade: 100 as any,
    comment: input.comment,
    createdBy: 'Teacher' as any,
    feedbackDate: now,
  };
}

const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('feedbacks');
    if (saved) {
      const parsed = JSON.parse(saved);
      const rebuilt = parsed.map((f: any) => new Feedback(makeFeedbackProps(f)));
      setFeedbacks(rebuilt);
    } else {
      setFeedbacks([
        new Feedback(makeFeedbackProps({ feedbackId: 1, studentId: 101, comment: 'Sample feedback 1' })),
        new Feedback(makeFeedbackProps({ feedbackId: 2, studentId: 102, comment: 'Sample feedback 2' })),
      ]);
    }
  }, []);

  const addRandomFeedback = () => {
    const newF = new Feedback(
      makeFeedbackProps({
        feedbackId: Math.floor(Math.random() * 1000),
        studentId: 100 + Math.floor(Math.random() * 100),
        comment: 'New feedback',
      })
    );
    const errs = newF.validate();
    if (errs.length) return alert('שגיאות:\n' + errs.join('\n'));
    setFeedbacks((prev) => [...prev, newF]);
    localStorage.setItem('feedbacks', JSON.stringify([...feedbacks, {
      feedbackId: newF.feedbackId,
      studentId: newF.StudentId,
      comment: newF.comment,
    }]));
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        ניהול משובים
      </Typography>
      <Button onClick={addRandomFeedback} variant="contained" sx={{ mb: 2 }}>
        הוסף משוב אקראי
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מזהה משוב</TableCell>
            <TableCell>מספר סטודנט</TableCell>
            <TableCell>הערה</TableCell>
            <TableCell>ציון</TableCell>
            <TableCell>תאריך</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map((f) => (
            <TableRow key={f.feedbackId}>
              <TableCell>{f.feedbackId}</TableCell>
              <TableCell>{f.StudentId}</TableCell>
              <TableCell>{f.comment}</TableCell>
              <TableCell>{f.grade}</TableCell>
              <TableCell>{f.feedbackDate.toLocaleDateString()}</TableCell>
              <TableCell>
                <Button component={Link} to={`/forms/feedback/${f.feedbackId}`}>
                  ערוך
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {feedbacks.length === 0 && (
            <TableRow><TableCell colSpan={6}>אין נתונים</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default FeedbackTable;