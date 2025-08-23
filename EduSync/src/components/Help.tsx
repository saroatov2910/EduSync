import React from 'react';
import { Container, Typography, Box, CardMedia } from '@mui/material';

const Help: React.FC = () => {
  return (
    <Container sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        עזרה
      </Typography>
      <Typography variant="body1" paragraph>
        זהו עמוד העזרה של מערכת EduSync. כאן תוכלו למצוא מידע שימושי והנחיות לשימוש במערכת.
      </Typography>
      <Typography variant="h6">יצירת פנייה חדשה</Typography>
      <ol>
        <li>נווט ל"טפסים" דרך התפריט.</li>
        <li>בחר "טופס בקשה".</li>
        <li>מלא את שדות מספר הסטודנט, נושא הבקשה, תיאור, ובחר גורם מטפל.</li>
        <li>הוסף קובץ במידת הצורך ולחץ "שלח".</li>
      </ol>
      <CardMedia
        component="img"
        image="/assets/request-form-demo.jpg"
        alt="דוגמה לטופס בקשה"
        sx={{ maxWidth: 500, my: 2 }}
      />
      <Typography variant="h6">שליחת הודעה</Typography>
      <ol>
        <li>נווט ל"פניות משתמש" דרך התפריט.</li>
        <li>כתוב את ההודעה בשדה הטקסט ולחץ אנטר.</li>
        <li>ההודעה תופיע בצ'אט עם חותמת זמן.</li>
      </ol>
      <CardMedia
        component="img"
        image="/assets/chat-demo.jpg"
        alt="דוגמה לצ'אט"
        sx={{ maxWidth: 500, my: 2 }}
      />
      <Typography variant="h6">טיפים שימושיים</Typography>
      <ul>
        <li>ודא שמספר הסטודנט תקין (6–10 ספרות).</li>
        <li>שמור נתונים באופן קבוע ב-localStorage לאחר עריכה.</li>
        <li>בדוק את סטטוס הפגישות ב"ניהול פגישות".</li>
      </ul>
    </Container>
  );
};

export default Help;