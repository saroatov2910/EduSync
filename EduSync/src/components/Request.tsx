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
  Snackbar,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Request from '../classRequest/Request';
import '../cssRules/Body.css';

// IMPORTANT: type-only imports because verbatimModuleSyntax is enabled
import type { RequestTopic, RequestStatus } from '../RequestStatus';

// ---- Helpers ----
// If the strings in storage/components don't match the union in RequestStatus.ts exactly,
// these helpers coerce them safely to the type while defaulting to a valid fallback.
const asRequestTopic = (value: unknown, fallback: RequestTopic): RequestTopic => {
  return (value as RequestTopic) ?? fallback;
};

const asRequestStatus = (value: unknown, fallback: RequestStatus): RequestStatus => {
  return (value as RequestStatus) ?? fallback;
};

const STORAGE_KEY = 'requests';

const RequestTable: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [message, setMessage] = useState<{
    text: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved).map(
        (r: any) =>
          new Request({
            requestId: r.requestId,
            studentId: r.studentId,
            firstName: r.firstName || '',
            lastName: r.lastName || '',
            email: r.email || '',
            mobile: r.mobile || '',
            major: r.major || '',
            // Coerce to RequestTopic with a safe fallback (adjust fallback to one of your allowed literals)
            requestTopic: asRequestTopic(r.requestTopic, 'General' as RequestTopic),
            requestText: r.requestText || r.description || '',
            requestDate: new Date(r.requestDate || Date.now()),
            // Coerce to RequestStatus with a safe fallback
            reqStatus: asRequestStatus(r.reqStatus, 'Open' as RequestStatus),
            handlerId: r.handlerId || 1,
          })
      );
      setRequests(parsed);
    } else {
      // Seed examples (use literals that exist in your RequestStatus.ts)
      setRequests([
        new Request({
          requestId: 1,
          studentId: 101,
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          major: '',
          requestTopic: 'General' as RequestTopic,
          requestText: 'בקשה לדוגמה 1',
          requestDate: new Date(),
          reqStatus: 'Open' as RequestStatus,
          handlerId: 1,
        }),
        new Request({
          requestId: 2,
          studentId: 102,
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          major: '',
          requestTopic: 'Academic' as RequestTopic,
          requestText: 'בקשה לדוגמה 2',
          requestDate: new Date(),
          reqStatus: 'Open' as RequestStatus,
          handlerId: 1,
        }),
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
      requestTopic: 'General' as RequestTopic,
      requestText: 'בקשה חדשה',
      requestDate: new Date(),
      reqStatus: 'Open' as RequestStatus,
      handlerId: 1,
    });

    const validationErrors = newRequest.validate();
    if (validationErrors.length) {
      setMessage({ text: 'שגיאות:\n' + validationErrors.join('\n'), severity: 'error' });
      return;
    }

    setRequests((prev) => {
      const next = [...prev, newRequest];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setMessage({ text: 'בקשה אקראית נוספה!', severity: 'success' });
  };

  const handleDelete = (id: number) => {
    setRequests((prev) => {
      const updated = prev.filter((r) => r.requestId !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setMessage({ text: 'בקשה נמחקה!', severity: 'success' });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    setMessage({ text: 'בקשות נשמרו!', severity: 'success' });
  };

  const handleCloseSnackbar = () => setMessage(null);

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
          {requests.map((r) => (
            <TableRow key={r.requestId}>
              <TableCell>{r.requestId}</TableCell>
              {/* If your Request class exposes StudentId with capital S, keep it. Otherwise, change to r.studentId */}
              <TableCell>{(r as any).StudentId ?? (r as any).studentId}</TableCell>
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

      <Snackbar open={!!message} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={message?.severity} sx={{ width: '100%' }}>
          {message?.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RequestTable;
