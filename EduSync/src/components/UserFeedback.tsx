// src/components/UserFeedback.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Feedback, FeedbackProps } from '../classFeedback/Feedback';
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

const UserFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('feedbacks');
    if (saved) {
      const parsed = JSON.parse(saved);
      const rebuilt = parsed.map((f: any) => new Feedback(makeFeedbackProps(f)));
      setFeedbacks(rebuilt.filter(f => f.StudentId === 101));
    }
  }, []);

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        המשובים שלי
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מזהה משוב</TableCell>
            <TableCell>הערה</TableCell>
            <TableCell>ציון</TableCell>
            <TableCell>תאריך</TableCell>
            <TableCell>נוצר על ידי</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map(f => (
            <TableRow key={f.feedbackId}>
              <TableCell>{f.feedbackId}</TableCell>
              <TableCell>{f.comment}</TableCell>
              <TableCell>{f.grade}</TableCell>
              <TableCell>{f.feedbackDate.toLocaleDateString()}</TableCell>
              <TableCell>{f.createdBy}</TableCell>
            </TableRow>
          ))}
          {feedbacks.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>אין משובים זמינים</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserFeedback;