import React, { useState, useEffect } from 'react';
import  Request from '../../classes/Request';
import '../cssRules/Body.css';

const RequestTable: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('requests');
    if (saved) {
      const parsed = JSON.parse(saved).map((r: any) =>
        new Request(r.requestId, r.studentId, r.description)
      );
      setRequests(parsed);
    } else {
      setRequests([
        new Request(1, 101, "בקשה לדוגמה 1"),
        new Request(2, 102, "בקשה לדוגמה 2")
      ]);
    }
  }, []);

  const addRandomRequest = () => {
    const newRequest = new Request(
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 100),
      "בקשה חדשה"
    );
    setRequests([...requests, newRequest]);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('requests', JSON.stringify(requests));
    alert("בקשות נשמרו!");
  };

  return (
    <div>
      <button onClick={addRandomRequest}>הוסף בקשה אקראית</button>
      <button onClick={saveToLocalStorage}>שמור ב-localStorage</button>
      <table border={1}>
        <thead>
          <tr>
            <th>requestId</th>
            <th>studentId</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.requestId}>
              <td>{r.requestId}</td>
              <td>{r.StudentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
