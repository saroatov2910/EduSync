import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase'; // adjust your firebase import

interface StudentFormData {
  name: string;
  age?: number;
}

export default function StudentForm() {
  const [formData, setFormData] = useState<StudentFormData>({ name: '', age: undefined });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? Number(value) : value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const saveStudent = httpsCallable(functions, 'saveStudent');
      await saveStudent(formData);
      alert('Student saved!');
      setFormData({ name: '', age: undefined });
    } catch (err) {
      console.error(err);
      alert('Error saving student');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} />
      <TextField label="Age" name="age" type="number" value={formData.age || ''} onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        Save Student
      </Button>
    </Box>
  );
}
