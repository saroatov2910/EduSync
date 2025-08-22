// src/components/Help.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import '../cssRules/index.css';

const Help: React.FC = () => {
  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        עזרה והדרכה
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography>1. יצירת פנייה: לחצו על "צור פנייה חדשה" בעמוד הבית או בטפסים.</Typography>
        <Typography>2. ניהול סטודנטים: עבור ל"ניהול" > "סטודנטים" לעריכה או הוספה.</Typography>
        <Typography>3. קביעת פגישה: השתמשו בטופס "קביעת פגישה" ב"טפסים".</Typography>
        <Typography>4. שליחת משוב: עבור ל"טפסים" > "הוספת משוב" להגשת משוב.</Typography>
        <Typography>5. צפייה בתורים שלי: עבור ל"תורים שלי" לראות פגישות של סטודנט מסוים.</Typography>
        <Typography>6. צפייה בבקשות שלי: עבור ל"בקשות שלי" לראות בקשות של סטודנט מסוים.</Typography>
        <Typography>7. צפייה במשובים שלי: עבור ל"משובים שלי" לראות משובים של סטודנט מסוים.</Typography>
      </Box>
    </Container>
  );
};

export default Help;