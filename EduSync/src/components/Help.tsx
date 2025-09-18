import React from 'react';
import { Container, Typography, Box, CardMedia } from '@mui/material';
import '../cssRules/HelpPage.css';

const Help: React.FC = () => {
  
  const displayHelpContent = () => {
    const helpPageTitle = "הוראות שימוש במערכת";
    const instructionList = [
      "נווט ל\"טפסים\" דרך התפריט.",
      "בחר \"טופס בקשה\".",
      "מלא את שדות מספר הסטודנט, נושא הבקשה, תיאור, ובחר גורם מטפל.",
      "הוסף קובץ במידת הצורך ולחץ \"שלח\"."
    ];
    
    return (
      <>
        <Typography variant="body1" paragraph>
          זהו עמוד העזרה של מערכת EduSync. כאן תוכלו למצוא מידע שימושי והנחיות לשימוש במערכת.
        </Typography>
        <Typography variant="h6">יצירת פנייה חדשה</Typography>
        <ol className="help-instruction-list">
          {instructionList.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </>
    );
  };

  return (
    <Container className="help-container" sx={{ direction: 'rtl', padding: '20px' }}>
      <Typography variant="h4" className="help-title-style" gutterBottom>
        עזרה
      </Typography>
      <div className="help-text-content">
        {displayHelpContent()}
      </div>
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