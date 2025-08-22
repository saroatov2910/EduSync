import React, { useEffect, useMemo, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CareHandler from "../classCareHandler/CareHandle";
import "../cssRules/index.css";

const LS_HANDLERS = "care_handlers_v1";

const CareHandlerTable: React.FC = () => {
  const [handlers, setHandlers] = useState<CareHandler[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_HANDLERS);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setHandlers(arr.map(CareHandler.from));
      }
    } catch (e) {
      console.error("failed to load handlers", e);
    }
  }, []);

  const existingIds = useMemo(() => new Set(handlers.map(h => h.handlerId)), [handlers]);

  const addRandom = () => {
    const h = CareHandler.random(existingIds);
    const errs = h.validate();
    if (errs.length) return alert("שגיאות:\n" + errs.join("\n"));
    setHandlers(prev => [...prev, h]);
  };

  const save = () => {
    try {
      localStorage.setItem(LS_HANDLERS, JSON.stringify(handlers));
      alert("נשמר ל-localStorage");
    } catch {
      alert("שגיאה בשמירה");
    }
  };

  const handleDelete = (id: number) => {
    const updated = handlers.filter(h => h.handlerId !== id);
    setHandlers(updated);
    localStorage.setItem(LS_HANDLERS, JSON.stringify(updated));
    alert("גורם מטפל נמחק!");
  };

  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        ניהול גורמים מטפלים
      </Typography>
      <Button onClick={addRandom} variant="contained" sx={{ mr: 2 }}>
        הוסף גורם מטפל אקראי
      </Button>
      <Button onClick={save} variant="contained">
        שמור ל-localStorage
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>handlerId</TableCell>
            <TableCell>name</TableCell>
            <TableCell>role</TableCell>
            <TableCell>email</TableCell>
            <TableCell>responsibility</TableCell>
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
                <Button component={Link} to={`/forms/carehandler/${h.handlerId}` } sx={{ mr: 1 }}>
                  ערוך
                </Button>
                <Button color="error" onClick={() => handleDelete(h.handlerId)}>
                  מחק
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