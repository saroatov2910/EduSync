import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderRoot from './components/layout/HeaderRoot';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './components/Home';
import AppointmentTable from './components/Appointment';
import CareHandleTable from './components/CareHandle';
import ContactMsgTable from './components/ContactMsg';
import RequestTable from './components/Request';
import StudentTable from './components/Student';
import HelpPage from './components/Help';
import FeedbackPage from './components/Feedback';

function App() {
  return (
    <div>
      <HeaderRoot />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* default Home page */}
          <Route path="/appointment" element={<AppointmentTable />} />
          <Route path="/carehandle" element={<CareHandleTable />} />
          <Route path="/contactmsg" element={<ContactMsgTable />} />
          <Route path="/request" element={<RequestTable />} />
          <Route path="/student" element={<StudentTable />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
