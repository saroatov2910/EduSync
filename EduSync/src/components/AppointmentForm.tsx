//טופס להוספה / עריכה של פגישות (requestId, date, time, type, location, status)
import React, { useState } from "react";
export default function AppointmentForm() {
  const [requestId, setRequestId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  return (
    <div>
      <form className="appointment-form" onSubmit={handleAddAppointment}>
        <label>Request ID:</label>
        <input type="text" name="requestId" value={requestId}
        onChange={(e) => setRequestId(e.target.value)} required />

        <label>Date:</label>
        <input type="date" name="date" value={date}
        onChange={(e) => setDate(e.target.value)} required />

        <label>Time:</label>
        <input type="time" name="time" value={time}
        onChange={(e) => setTime(e.target.value)} required />

        <label>Type:</label>
        <input type="text" name="type" value={type}
        onChange={(e) => setType(e.target.value)} required />

        <label>Location:</label>
        <input type="text" name="location" value={location}
        onChange={(e) => setLocation(e.target.value)} required />

        <label>Status:</label>
        <input type="text" name="status" value={status}
        onChange={(e) => setStatus(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}