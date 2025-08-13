import React, { useState } from 'react';
import { Request } from '../classes/request';
import '../cssRules/Body.css';

const RequestTable: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([
    new Request(1, 101, "בקשה ללימוד נוסף", "מתוכננת", new Date("2025-08-15")),
    new Request(2, 102, "בקשה לייעוץ", "בוצעה", new Date("2025-08-16"))
  ]);

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>id</th>
          <th>studentId</th>
          <th>type</th>
          <th>status</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(r => (
          <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.studentId}</td>
            <td>{r.type}</td>
            <td>{r.status}</td>
            <td>{r.date.toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestTable;
