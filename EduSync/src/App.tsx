import './cssRules/App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import React from 'react';
import AppointmentTable from './components/Appointment';
import StudentTable from './components/Student';
import RequestTable from './components/Request';
import FeedbackTable from './components/Feedback';
import CareHandlerTable from './components/CareHandle';
import ContactMsgTable from './components/ContactMsg';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Body />

      <h1>מערכת ניהול</h1>

      <h2>פגישות</h2>
      <AppointmentTable />

      <h2>סטודנטים</h2>
      <StudentTable />

      <h2>בקשות</h2>
      <RequestTable />

      <h2>משוב</h2>
      <FeedbackTable />

      <h2>מטפלים</h2>
      <CareHandlerTable />

      <h2>הודעות קשר</h2>
      <ContactMsgTable />

      <Footer />
    </div>
  );
};

export default App;
