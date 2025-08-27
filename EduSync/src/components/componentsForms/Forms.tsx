<<<<<<< HEAD
import { useState } from "react";

 export default function Forms() {
    type FormData = {
        studentId: string;
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
        major: string;
        requestId: number;
        requestTopic: string;
        requestText: string;
        requestDate: Date;
        reqStatus: string;
        handlerId: number;
    };

    const [formState, setFormState] = useState<FormData>({
        studentId: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        major: "",
        requestId: 0,
        requestTopic: "",
        requestText: "",
        requestDate: new Date(),
        reqStatus: "",
        handlerId: 0
    });
    
    const [errors, setErrors] = useState<string[]>([]);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Validate form data
        const validationErrors = validateForm(formState);
        
        if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
        }
    
        // Submit form data
        console.log("Form submitted successfully", formState);
    };
    
    const validateForm = (data: FormData) => {
        const errors: string[] = [];
        
        if (!data.studentId) errors.push("Student ID is required.");
        if (!data.firstName) errors.push("First name is required.");
        if (!data.lastName) errors.push("Last name is required.");
        
        // Add more validation as needed
    
        return errors;
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Student ID"
                value={formState.studentId}
                onChange={e => setFormState({ ...formState, studentId: e.target.value })}
            />
            <input
                type="text"
                placeholder="First Name"
                value={formState.firstName}
                onChange={e => setFormState({ ...formState, firstName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={formState.lastName}
                onChange={e => setFormState({ ...formState, lastName: e.target.value })}
            />
            {/* Add more fields as needed */}
            <button type="submit">Submit</button>
            {errors.length > 0 && <div className="error">{errors.join(", ")}</div>}
        </form>
    );


 }
    
=======
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
>>>>>>> origin/main
