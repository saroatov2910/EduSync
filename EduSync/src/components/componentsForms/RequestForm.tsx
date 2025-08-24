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
// Import SelectChangeEvent as a type-only import (for projects with verbatimModuleSyntax)
import type { SelectChangeEvent } from '@mui/material/Select';

import Request from '../../classRequest/Request';
import CareHandler from '../../classCareHandler/CareHandle';

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

  useEffect(() => {
    // Load handlers from localStorage and revive to CareHandler instances if your class exposes a static 'from'
    const saved = JSON.parse(localStorage.getItem('care_handlers_v1') || '[]');
    // If your class exposes a static 'from' helper:
    if (typeof (CareHandler as any).from === 'function') {
      setHandlers(saved.map((CareHandler as any).from));
    } else {
      // Fallback: keep as plain objects (adjust rendering accordingly)
      setHandlers(saved);
    }
  }, []);

  // Generic handler for TextField and TextArea
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Select-specific handlers (fixes MUI Select typing errors)
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

    // Build the Request model. If RequestProps.requestTopic is a different type
    // (e.g., an enum or a different union), the cast below prevents TS error.
    const request = new Request({
      studentId: Number(formData.studentId),
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      major: '',
      requestId: Math.floor(Math.random() * 1000),
      requestTopic: formData.requestTopic as any, // Cast to the Request model's expected type
      requestText: formData.requestText,
      requestDate: new Date(),
      reqStatus: 'Open' as any, // Adjust if you have a specific ReqStatus type
      handlerId: Number(formData.handlerId),
    });

    // Validate if your model exposes a validate() method
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

    alert('בקשה נוספה בהצלחה!');
    setFormData({ studentId: '', requestTopic: 'General', requestText: '', handlerId: '' });
    setFile(null);
    setErrors([]);
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
    </Box>
  );
}
