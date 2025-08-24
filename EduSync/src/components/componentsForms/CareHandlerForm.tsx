import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import CareHandler from '../../classCareHandler/CareHandle';

type Role = 'מרצה' | 'מזכירות';

interface FormState {
  handlerId: string;
  name: string;
  role: Role;
  email: string;
  responsibility: string;
}

export default function CareHandlerForm() {
  const [formData, setFormData] = useState<FormState>({
    handlerId: '',
    name: '',
    role: 'מרצה',
    email: '',
    responsibility: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  // Handles TextField / textarea changes
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles MUI <Select> changes
  const handleSelectChange = (e: SelectChangeEvent<Role>) => {
    const { name, value } = e.target; // value is string
    setFormData((prev) => ({ ...prev, [name as keyof FormState]: value as Role }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const careHandler = new CareHandler(
      Number(formData.handlerId),
      formData.name,
      formData.role,
      formData.email,
      formData.responsibility
    );

    const validationErrors = careHandler.validate?.() ?? [];
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

    const key = 'care_handlers_v1';
    const handlers = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([...handlers, careHandler]));

    alert('גורם מטפל נוסף בהצלחה!');
    setFormData({ handlerId: '', name: '', role: 'מרצה', email: '', responsibility: '' });
    setErrors([]);
  };

  return (
    <Box sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h5">טופס גורם מטפל</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="מספר מזהה"
          name="handlerId"
          value={formData.handlerId}
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="שם"
          name="name"
          value={formData.name}
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">תפקיד</InputLabel>
          <Select<Role>
            labelId="role-label"
            id="role"
            name="role"
            label="תפקיד"
            value={formData.role}
            onChange={handleSelectChange}
            required
          >
            <MenuItem value="מרצה">מרצה</MenuItem>
            <MenuItem value="מזכירות">מזכירות</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="דוא״ל"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="תחום אחריות"
          name="responsibility"
          value={formData.responsibility}
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
        />

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
