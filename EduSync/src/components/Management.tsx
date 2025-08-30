// src/components/Management.tsx
import React from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Management() {
  const navigate = useNavigate();

  const cards = [
    { title: 'סטודנטים', path: '/admin/students' },
    { title: 'בקשות', path: '/admin/requests' },
    { title: 'פגישות', path: '/admin/appointments' },
    { title: 'גורמים מטפלים', path: '/admin/care-handlers' },
    { title: 'משובים', path: '/admin/feedbacks' },
    { title: 'הודעות משתמש', path: '/admin/messages' },
  ];

  return (
    <Container sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>מסכי ניהול</Typography>

      {/* במקום Grid/Unstable_Grid2: CSS Grid פשוט דרך Box */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',          // טור אחד במובייל
            sm: '1fr 1fr',      // שני טורים בטאבלט
            md: 'repeat(3, 1fr)'// שלושה טורים בדסקטופ
          },
          gap: 2,
        }}
      >
        {cards.map((c) => (
          <Card key={c.path} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{c.title}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate(c.path)} variant="contained">פתח</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
