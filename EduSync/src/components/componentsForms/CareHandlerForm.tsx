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
import SaveSnackbar from '../Snackbar';
import { safeParse , readLS , writeLS } from '../../Functions/Utils'; 

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
  const [saved, setSaved] = useState(false);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<Role>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof FormState]: value as Role }));
  };

  const validate = (): string[] => {
    const v: string[] = [];
    if (!formData.handlerId.trim()) v.push('מספר מזהה נדרש');
    if (!formData.name.trim()) v.push('שם נדרש');
    if (!formData.email.trim()) v.push('דוא״ל נדרש');
    if (!formData.responsibility.trim()) v.push('תחום אחריות נדרש');
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const v = validate();
    if (v.length) {
      setErrors(v);
      return;
    }

    const key = 'care_handlers_v1';
    const handlers = readLS<any[]>(key, []);
    const newHandler = {
      handlerId: Number(formData.handlerId),
      name: formData.name,
      role: formData.role,
      email: formData.email,
      responsibility: formData.responsibility,
    };

    writeLS(key, [...handlers, newHandler]);

    setFormData({ handlerId: '', name: '', role: 'מרצה', email: '', responsibility: '' });
    setErrors([]);
    setSaved(true);
  };

  return (
    <Box sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h4" gutterBottom>טופס גורם מטפל</Typography>

      <form onSubmit={handleSubmit} aria-label="טופס הזנת גורם מטפל">
        <TextField
          label="מספר מזהה"
          name="handlerId"
          value={formData.handlerId}
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
          inputProps={{ inputMode: 'numeric', 'aria-label': 'מספר מזהה' }}
        />

        <TextField
          label="שם"
          name="name"
          value={formData.name}
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
          inputProps={{ 'aria-label': 'שם' }}
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
            aria-label="בחר תפקיד"
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
          inputProps={{ 'aria-label': 'דוא״ל' }}
        />

        <TextField
          label="תחום אחריות"
          name="responsibility"
          value={formData.responsibility}
          onChange={handleTextChange}
          required
          fullWidth
          margin="normal"
          inputProps={{ 'aria-label': 'תחום אחריות' }}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }} aria-label="שמור גורם מטפל">
          שלח
        </Button>

        {errors.length > 0 && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.join(', ')}
          </Typography>
        )}
      </form>

      <SaveSnackbar open={saved} onClose={() => setSaved(false)} message={`גורם מטפל נוסף בהצלחה!`} />
    </Box>
  );
}
