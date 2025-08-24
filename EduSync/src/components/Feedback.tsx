// src/components/Feedback.tsx
// Notes:
// - Comments are in English
// - Types are imported with type-only import
// - We rely on your RequestStatus module for the shared enums/types

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Feedback from '../classFeedback/Feedback';
// Types-only (to satisfy `verbatimModuleSyntax`)
import type { RequestTopic, RequestStatus, createdBy, grade } from '../RequestStatus';
import '../cssRules/Body.css';

const STORAGE_KEY = 'feedbacks';

const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // Revive plain objects into Feedback instances and ensure Date fields are Date objects
      const parsed = (JSON.parse(saved) as any[]).map(
        (f) =>
          new Feedback({
            studentId: Number(f.studentId),
            firstName: f.firstName ?? '',
            lastName: f.lastName ?? '',
            email: f.email ?? '',
            mobile: f.mobile ?? '',
            major: f.major ?? '',
            requestId: Number(f.requestId ?? Math.floor(Math.random() * 1000)),
            requestTopic: (f.requestTopic ?? 'General') as RequestTopic,
            requestText: f.requestText ?? f.comment ?? '',
            requestDate: new Date(f.requestDate ?? Date.now()),
            reqStatus: (f.reqStatus ?? 'Open') as RequestStatus,
            handlerId: Number(f.handlerId ?? 1),
            feedbackId: Number(f.feedbackId ?? Math.floor(Math.random() * 1000)),
            grade: Number(f.grade ?? 1) as grade,
            comment: f.comment ?? '',
            createdBy: (f.createdBy ?? 'Student') as createdBy,
            feedbackDate: new Date(f.feedbackDate ?? Date.now()),
          })
      );
      setFeedbacks(parsed);
    } else {
      // Seed with two examples (types aligned with your class)
      setFeedbacks([
        new Feedback({
          studentId: 101,
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          major: '',
          requestId: 1001,
          requestTopic: 'General' as RequestTopic,
          requestText: 'Sample feedback 1',
          requestDate: new Date(),
          reqStatus: 'Open' as RequestStatus,
          handlerId: 1,
          feedbackId: 1,
          grade: 4 as grade,
          comment: 'Sample feedback 1',
          createdBy: 'Student' as createdBy,
          feedbackDate: new Date(),
        }),
        new Feedback({
          studentId: 102,
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          major: '',
          requestId: 1002,
          requestTopic: 'Academic' as RequestTopic,
          requestText: 'Sample feedback 2',
          requestDate: new Date(),
          reqStatus: 'Open' as RequestStatus,
          handlerId: 1,
          feedbackId: 2,
          grade: 5 as grade,
          comment: 'Sample feedback 2',
          createdBy: 'Student' as createdBy,
          feedbackDate: new Date(),
        }),
      ]);
    }
  }, []);

  const addRandomFeedback = () => {
    const newFeedback = new Feedback({
      studentId: 100 + Math.floor(Math.random() * 100),
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      major: '',
      requestId: Math.floor(Math.random() * 1000),
      requestTopic: 'General' as RequestTopic,
      requestText: 'New feedback',
      requestDate: new Date(),
      reqStatus: 'Open' as RequestStatus,
      handlerId: 1,
      feedbackId: Math.floor(Math.random() * 1000),
      grade: (Math.floor(Math.random() * 5) + 1) as grade,
      comment: 'New feedback',
      createdBy: 'Student' as createdBy,
      feedbackDate: new Date(),
    });

    const validationErrors = newFeedback.validate();
    if (validationErrors.length) {
      alert('שגיאות:\n' + validationErrors.join('\n'));
      return;
    }

    // Use functional update and persist the resulting array
    setFeedbacks((prev) => {
      const next = [...prev, newFeedback];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleDelete = (id: number) => {
    setFeedbacks((prev) => {
      const updated = prev.filter((f) => f.feedbackId !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    alert('משוב נמחק!');
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
    alert('משובים נשמרו!');
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        משובים
      </Typography>
      <Button onClick={addRandomFeedback} variant="contained" sx={{ mb: 2, mr: 1 }}>
        הוסף משוב אקראי
      </Button>
      <Button onClick={saveToLocalStorage} variant="contained" sx={{ mb: 2 }}>
        שמור ב-localStorage
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מספר משוב</TableCell>
            <TableCell>מספר סטודנט</TableCell>
            <TableCell>ציון</TableCell>
            <TableCell>הערות</TableCell>
            <TableCell>נוצר על ידי</TableCell>
            <TableCell>תאריך</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map((f) => (
            <TableRow key={f.feedbackId}>
              <TableCell>{f.feedbackId}</TableCell>
              <TableCell>{f.StudentId}</TableCell>
              <TableCell>{f.grade}</TableCell>
              <TableCell>{f.comment}</TableCell>
              <TableCell>{f.createdBy}</TableCell>
              <TableCell>{new Date(f.feedbackDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button component={Link} to={`/forms/feedback/${f.feedbackId}`} sx={{ mr: 1 }}>
                  ערוך
                </Button>
                <Button color="error" onClick={() => handleDelete(f.feedbackId)}>
                  מחק
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default FeedbackTable;
