// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderRoot from './components/layout/HeaderRoot';
import Footer from './components/layout/Footer';
import Body from './components/layout/Body';
// Pages
import HomePage from './components/HomePage';
import AppointmentTable from './components/Appointment';
import CareHandleTable from './components/CareHandle';
import ContactMsgTable from './components/ContactMsg';
import RequestTable from './components/Request';
import StudentTable from './components/Student';
import HelpPage from './components/Help';
import FeedbackPage from './components/Feedback';
import Forms from './components/componentsForms/Forms';
import StudentForm from './components/componentsForms/StudentForm';
import RequestForm from './components/componentsForms/RequestForm';
import CareHandlerForm from './components/componentsForms/CareHandlerForm';
import AppointmentForm from './components/componentsForms/AppointmentForm';
import FeedbackForm from './components/componentsForms/FeedbackForm';
import ContactMsgForm from './components/componentsForms/ContactMsgForm';
import UserAppointments from './components/UserAppointments';
import UserRequests from './components/UserRequests';
import UserFeedback from './components/UserFeedback';
import Management from './components/componentsForms/Management';
import './cssRules/App.css';

function App() {
  return (
    <div>
      <HeaderRoot />
      <Body>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointment" element={<AppointmentTable />} />
          <Route path="/carehandle" element={<CareHandleTable />} />
          <Route path="/contactmsg" element={<ContactMsgTable />} />
          <Route path="/request" element={<RequestTable />} />
          <Route path="/student" element={<StudentTable />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/forms/student" element={<StudentForm />} />
          <Route path="/forms/student/:id" element={<StudentForm />} />
          <Route path="/forms/request" element={<RequestForm />} />
          <Route path="/forms/request/:id" element={<RequestForm />} />
          <Route path="/forms/carehandler" element={<CareHandlerForm />} />
          <Route path="/forms/carehandler/:id" element={<CareHandlerForm />} />
          <Route path="/forms/appointment" element={<AppointmentForm />} />
          <Route path="/forms/appointment/:id" element={<AppointmentForm />} />
          <Route path="/forms/feedback" element={<FeedbackForm />} />
          <Route path="/forms/feedback/:id" element={<FeedbackForm />} />
          <Route path="/forms/contactmsg" element={<ContactMsgForm />} />
          <Route path="/forms/contactmsg/:id" element={<ContactMsgForm />} />
          <Route path="/user/appointments" element={<UserAppointments />} />
          <Route path="/user/requests" element={<UserRequests />} />
          <Route path="/user/feedback" element={<UserFeedback />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </Body>
      <Footer />
    </div>
  );
}

export default App;