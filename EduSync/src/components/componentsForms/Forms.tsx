// All comments must be in English
import { Container, Typography, Button } from '@mui/material';
// IMPORTANT: default import for Grid fixes the TS overload errors for item/container
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

// These paths assume this file is in: src/components/componentsForms/Forms.tsx
// and the other form components are in the same folder.
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

      {/* Use classic Grid with container/item */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="#student-form" variant="contained" fullWidth>
            טופס סטודנט
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="#request-form" variant="contained" fullWidth>
            טופס בקשה
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="#appointment-form" variant="contained" fullWidth>
            טופס פגישה
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="#feedback-form" variant="contained" fullWidth>
            טופס משוב
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="#carehandler-form" variant="contained" fullWidth>
            טופס גורם מטפל
          </Button>
        </Grid>
      </Grid>

      {/* Anchor targets for the buttons above */}
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
