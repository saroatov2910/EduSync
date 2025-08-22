// src/components/CareHandle.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CareHandler from '../classCareHandler/CareHandle';
import '../cssRules/index.css';

const CareHandlerTable: React.FC = () => {
  const [handlers, setHandlers] = useState<CareHandler[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('care_handlers_v1');
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setHandlers(arr.map(CareHandler.from));
      }
    } catch (e) {
      console.error('failed to load handlers', e);
    }
  }, []);

  const existingIds = useMemo(() => new Set(handlers.map(h => h.handlerId)), [handlers]);

  const addRandom = () => {
    const h = CareHandler.random(existingIds);
    const errs = h.validate();
    if (errs.length) return alert('שגיאות:\n' + errs.join('\n'));
    setHandlers(prev => [...prev, h]);
    localStorage.setItem('care_handlers_v1', JSON.stringify([...handlers, h]));
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        ניהול גורמים מטפלים
      </Typography>
      <Button onClick={addRandom} variant="contained" sx={{ mb: 2 }}>
        הוסף גורם מטפל אקראי
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>מזהה גורם</TableCell>
            <TableCell>שם</TableCell>
            <TableCell>תפקיד</TableCell>
            <TableCell>דוא״ל</TableCell>
            <TableCell>תחום אחריות</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {handlers.map(h => (
            <TableRow key={h.handlerId}>
              <TableCell>{h.handlerId}</TableCell>
              <TableCell>{h.name}</TableCell>
              <TableCell>{h.role}</TableCell>
              <TableCell>{h.email}</TableCell>
              <TableCell>{h.responsibility}</TableCell>
              <TableCell>
                <Button component={Link} to={`/forms/carehandler/${h.handlerId}`}>
                  ערוך
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {handlers.length === 0 && (
            <TableRow><TableCell colSpan={6}>אין נתונים</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default CareHandlerTable;