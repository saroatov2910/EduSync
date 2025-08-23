import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Management: React.FC = () => {
  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        ניהול
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        בחר מסך ניהול מתוך האפשרויות הבאות:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/student" variant="contained" fullWidth>
            ניהול סטודנטים
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/request" variant="contained" fullWidth>
            ניהול בקשות
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/appointment" variant="contained" fullWidth>
            ניהול פגישות
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/carehandle" variant="contained" fullWidth>
            ניהול גורמים מטפלים
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/feedback" variant="contained" fullWidth>
            ניהול משובים
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Management;