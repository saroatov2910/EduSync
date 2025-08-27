import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
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
      <Typography variant="h5" sx={{ mb: 2 }}>מסכי ניהול</Typography>
      <Grid container spacing={2}>
        {cards.map((c) => (
          <Grid key={c.path} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{c.title}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => navigate(c.path)} variant="contained">פתח</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}