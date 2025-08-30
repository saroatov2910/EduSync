import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import Request from '../../classRequest/Request';
import CareHandler from '../../classCareHandler/CareHandle';
import SaveSnackbar from '../Snackbar';

// Narrow local UI state for the select values
type UiRequestTopic = 'General' | 'Academic' | 'Administrative';

interface FormState {
  studentId: string;
  requestTopic: UiRequestTopic;
  requestText: string;
  handlerId: string;
}

export default function RequestForm() {
  const [formData, setFormData] = useState<FormState>({
    studentId: '',
    requestTopic: 'General',
    requestText: '',
    handlerId: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [handlers, setHandlers] = useState<CareHandler[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedHandlers = JSON.parse(localStorage.getItem('care_handlers_v1') || '[]');
    if (typeof (CareHandler as any).from === 'function') {
      setHandlers(savedHandlers.map((CareHandler as any).from));
    } else {
      setHandlers(savedHandlers);
    }
  }, []);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTopicChange = (e: SelectChangeEvent<UiRequestTopic>) => {
    setFormData(prev => ({ ...prev, requestTopic: e.target.value as UiRequestTopic }));
  };

  const handleHandlerChange = (e: SelectChangeEvent<string>) => {
    setFormData(prev => ({ ...prev, handlerId: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const request = new Request({
      studentId: Number(formData.studentId),
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      major: '',
      requestId: Math.floor(Math.random() * 1000),
      requestTopic: formData.requestTopic as any,
      requestText: formData.requestText,
      requestDate: new Date(),
      reqStatus: 'Open' as any,
      handlerId: Number(formData.handlerId),
    });

    const validationErrors =
      typeof (request as any).validate === 'function' ? (request as any).validate() : [];

    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    localStorage.setItem(
      'requests',
      JSON.stringify([...requests, { ...request, file: file?.name ?? null }])
    );

    setFormData({ studentId: '', requestTopic: 'General', requestText: '', handlerId: '' });
    setFile(null);
    setErrors([]);
    setSaved(true);
  };

  return (
    <Box sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h5">טופס בקשה</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="מספר סטודנט"
          name="studentId"
          value={formData.studentId}
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>נושא הבקשה</InputLabel>
          <Select<UiRequestTopic>
            name="requestTopic"
            value={formData.requestTopic}
            onChange={handleTopicChange}
            label="נושא הבקשה"
            required
          >
            <MenuItem value="General">כללי</MenuItem>
            <MenuItem value="Academic">אקדמי</MenuItem>
            <MenuItem value="Administrative">מנהלי</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="תיאור הבקשה"
          name="requestText"
          value={formData.requestText}
          onChange={handleTextChange}
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>גורם מטפל</InputLabel>
          <Select<string>
            name="handlerId"
            value={formData.handlerId}
            onChange={handleHandlerChange}
            label="גורם מטפל"
            required
          >
            {handlers.map((h: any) => (
              <MenuItem key={h.handlerId} value={String(h.handlerId)}>
                {h.name} ({h.role})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          שלח
        </Button>

        {errors.length > 0 && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.join(', ')}
          </Typography>
        )}
      </form>

      <SaveSnackbar open={saved} onClose={() => setSaved(false)} message="בקשה נשמרה בהצלחה!" />
    </Box>
  );
}