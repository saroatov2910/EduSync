// All comments must be in English
import { Container, Typography, Button, Stack, Box } from '@mui/material';
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
    <Container sx={{ direction: 'rtl', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        טפסים
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        בחר טופס להוספה או עריכה של נתונים:
      </Typography>

      {/* Buttons row – flex wrap instead of Grid */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Button component={Link} to="#student-form" variant="contained" sx={{ flex: '1 1 220px' }}>
          טופס סטודנט
        </Button>

        <Button component={Link} to="#request-form" variant="contained" sx={{ flex: '1 1 220px' }}>
          טופס בקשה
        </Button>

        <Button component={Link} to="#appointment-form" variant="contained" sx={{ flex: '1 1 220px' }}>
          טופס פגישה
        </Button>

        <Button component={Link} to="#feedback-form" variant="contained" sx={{ flex: '1 1 220px' }}>
          טופס משוב
        </Button>

        <Button component={Link} to="#carehandler-form" variant="contained" sx={{ flex: '1 1 220px' }}>
          טופס גורם מטפל
        </Button>
      </Box>

      {/* Anchor targets for the buttons above */}
      <Stack spacing={6}>
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
      </Stack>
    </Container>
  );
}
