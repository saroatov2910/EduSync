import React from 'react'
import Appointment from './Appointment'
import { useState } from 'react';
import './cssRules/Body.css'


const AppointmentTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    new Appointment(1, 101, new Date("2025-08-20"), "10:30", "פרונטלי", "101", "מתוכננת"),
    new Appointment(2, 102, new Date("2025-08-21"), "14:00", "זום", "https://zoom.us/j/123456789", "מתוכננת")
  ]);

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>appointmentId</th>
          <th>requestId</th>
          <th>appointmentDate</th>
          <th>appointmentTime</th>
          <th>appointmentType</th>
          <th>location</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map(a => (
          <tr key={a.appointmentId}>
            <td>{a.appointmentId}</td>
            <td>{a.requestId}</td>
            <td>{a.appointmentDate.toLocaleDateString()}</td>
            <td>{a.appointmentTime}</td>
            <td>{a.appointmentType}</td>
            <td>{a.location}</td>
            <td>{a.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;
