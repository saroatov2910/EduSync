import React, { useState, useEffect } from 'react';
import { Appointment } from '../classes/appointment';
import '../cssRules/Body.css';

const AppointmentTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      const parsed = JSON.parse(saved).map((a: any) => 
        new Appointment(
          a.appointmentId,
          a.requestId,
          new Date(a.appointmentDate),
          a.appointmentTime,
          a.appointmentType,
          a.location,
          a.status
        )
      );
      setAppointments(parsed);
    } else {
      setAppointments([
        new Appointment(1, 101, new Date("2025-08-20"), "10:30", "פרונטלי", "101", "מתוכננת"),
        new Appointment(2, 102, new Date("2025-08-21"), "14:00", "זום", "https://zoom.us/j/123456789", "מתוכננת")
      ]);
    }
  }, []);

  const addRandomAppointment = () => {
    const newAppointment = new Appointment(
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 100),  
      new Date(),
      "12:00",
      Math.random() > 0.5 ? "זום" : "פרונטלי",
      Math.random() > 0.5 ? "https://zoom.us/j/987654321" : "103",
      "מתוכננת"
    );

    setAppointments([...appointments, newAppointment]);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
    alert("הנתונים נשמרו בהצלחה!");
  };

  return (
    <div>
      <h2>פגישות</h2>
      <button onClick={addRandomAppointment}>הוסף פגישה אקראית</button>
      <button onClick={saveToLocalStorage}>שמור ב-localStorage</button>

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
              <td>{new Date(a.appointmentDate).toLocaleDateString()}</td>
              <td>{a.appointmentTime}</td>
              <td>{a.appointmentType}</td>
              <td>{a.location}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
