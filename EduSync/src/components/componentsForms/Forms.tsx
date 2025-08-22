// src/components/componentsForms/Forms.tsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Forms: React.FC = () => {
  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        טפסים
      </Typography>
      <Button component={Link} to="/forms/student" variant="contained" sx={{ m: 1 }}>
        הוספת/עדכון סטודנט
      </Button>
      <Button component={Link} to="/forms/request" variant="contained" sx={{ m: 1 }}>
        יצירת פנייה
      </Button>
      <Button component={Link} to="/forms/carehandler" variant="contained" sx={{ m: 1 }}>
        הוספת/עדכון גורם מטפל
      </Button>
      <Button component={Link} to="/forms/appointment" variant="contained" sx={{ m: 1 }}>
        קביעת פגישה
      </Button>
      <Button component={Link} to="/forms/feedback" variant="contained" sx={{ m: 1 }}>
        הוספת משוב
      </Button>
      <Button component={Link} to="/forms/contactmsg" variant="contained" sx={{ m: 1 }}>
        שליחת הודעה
      </Button>
    </Container>
  );
};

export default Forms;