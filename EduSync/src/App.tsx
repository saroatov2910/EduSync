import HeaderRoot from './components/layout/HeaderRoot';
import Footer from './components/layout/Footer';
import { Routes, Route } from 'react-router-dom';

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
import Management from './components/Management';
import AppointmentForm from './components/componentsForms/AppointmentForm';
import UserRequests from './components/UserRequests';

export default function App() {
  return (
    <>
      <HeaderRoot />
      <main style={{padding: 16}}>
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
          <Route path="/management" element={<Management />} />
          <Route path="/forms/appointment/:id" element={<AppointmentForm />} />
          <Route path="/user/requests" element={<UserRequests />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
}
