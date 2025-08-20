import React from "react";
import { Container, Typography } from "@mui/material";

const Help: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        עזרה
      </Typography>
      <Typography variant="body1">
        זהו עמוד העזרה של המערכת. כאן תוכלו למצוא מידע שימושי, הסברים והנחיות.
      </Typography>
    </Container>
  );
};

export default Help;
