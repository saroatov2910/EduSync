import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Request from '../classRequest/Request';
import '../cssRules/Body.css';

const RequestTable: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('requests');
    if (saved) {
      const parsed = JSON.parse(saved).map((r: any) =>
        new Request({
          requestId: r.requestId,
          studentId: r.studentId,
          firstName: r.firstName || '',
          lastName: r.lastName || '',
          email: r.email || '',
          mobile: r.mobile || '',
          major: r.major || '',
          requestTopic: r.requestTopic || 'General',
          requestText: r.requestText || r.description,
          requestDate: new Date(r.requestDate || Date.now()),
          reqStatus: r.reqStatus || 'Open',
          handlerId: r.handlerId || 1
        })
      );
      setRequests(parsed);
    } else {
      setRequests([
        new Request({
          requestId: 1,
          studentId: 101,
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          major: '',
          requestTopic: 'General',
          requestText: 'בקשה לדוגמה 1',
          requestDate: new Date(),
          reqStatus: 'Open',
          handlerId: 1
        }),
        new Request({
          requestId: 2,
          studentId: 102,
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          major: '',
          requestTopic: 'Academic',
          requestText: 'בקשה לדוגמה 2',
          requestDate: new Date(),
          reqStatus: 'Open',
          handlerId: 1
        })
      ]);
    }
  }, []);

  const addRandomRequest = () => {
    const newRequest = new Request({
      requestId: Math.floor(Math.random() * 1000),
      studentId: Math.floor(Math.random() * 100),
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      major: '',
      requestTopic: 'General',
      requestText: 'בקשה חדשה',
      requestDate: new Date(),
      reqStatus: 'Open',
      handlerId: 1
    });
    const validationErrors = newRequest.validate();
    if (validationErrors.length) {
      alert('שגיאות:\n' + validationErrors.join('\n'));
      return;
    }
    setRequests([...requests, newRequest]);
    localStorage.setItem('requests', JSON.stringify([...requests, newRequest]));
  };

  const handleDelete = (id: number) => {
    const updated = requests.filter(r => r.requestId !== id);
    setRequests(updated);
    localStorage.setItem('requests', JSON.stringify(updated));
    alert('בקשה נמחקה!');
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('requests', JSON.stringify(requests));
    alert('בקשות נשמרו!');
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        בקשות
      </Typography>
      <Button onClick={addRandomRequest} variant="contained" sx={{ mb: 2, mr: 1 }}>
        הוסף בקשה אקראית
      </Button>
      <Button onClick={saveToLocalStorage} variant="contained" sx={{ mb: 2 }}>
        שמור ב-localStorage
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מספר בקשה</TableCell>
            <TableCell>מספר סטודנט</TableCell>
            <TableCell>נושא</TableCell>
            <TableCell>תיאור</TableCell>
            <TableCell>תאריך</TableCell>
            <TableCell>סטטוס</TableCell>
            <TableCell>גורם מטפל</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map(r => (
            <TableRow key={r.requestId}>
              <TableCell>{r.requestId}</TableCell>
              <TableCell>{r.StudentId}</TableCell>
              <TableCell>{r.requestTopic}</TableCell>
              <TableCell>{r.requestText}</TableCell>
              <TableCell>{new Date(r.requestDate).toLocaleDateString()}</TableCell>
              <TableCell>{r.reqStatus}</TableCell>
              <TableCell>{r.handlerId}</TableCell>
              <TableCell>
                <Button component={Link} to={`/forms/request/${r.requestId}`} sx={{ mr: 1 }}>
                  ערוך
                </Button>
                <Button color="error" onClick={() => handleDelete(r.requestId)}>
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

export default RequestTable;