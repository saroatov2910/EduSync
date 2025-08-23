import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

// Import your form components
import StudentForm from './StudentForm';
import RequestForm from './RequestForm';
import AppointmentForm from './AppointmentForm';
import FeedbackForm from './FeedbackForm';
import CareHandlerForm from './CareHandlerForm';

export default function Forms() {
  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        טפסים
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        בחר טופס להוספה או עריכה של נתונים:
      </Typography>

      {/* The parent Grid component acts as a container */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Child grids automatically act as items. */}
        {/* We use the `size` prop to define breakpoints. */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button component={Link} to="#student-form" variant="contained" fullWidth>
            טופס סטודנט
          </Button>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button component={Link} to="#request-form" variant="contained" fullWidth>
            טופס בקשה
          </Button>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button component={Link} to="#appointment-form" variant="contained" fullWidth>
            טופס פגישה
          </Button>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button component={Link} to="#feedback-form" variant="contained" fullWidth>
            טופס משוב
          </Button>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button component={Link} to="#carehandler-form" variant="contained" fullWidth>
            טופס גורם מטפל
          </Button>
        </Grid>
      </Grid>

      {/* Anchor targets */}
      <div id="student-form">
        <StudentForm />
      </div>
      <div id="request-form">
        <RequestForm />
      </div>
      <div id="appointment-form">
        <AppointmentForm />
      </div>
      <div id="feedback-form">
        <FeedbackForm />
      </div>
      <div id="carehandler-form">
        <CareHandlerForm />
      </div>
    </Container>
  );
}