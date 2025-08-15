import React, { useState, useEffect } from 'react';
import { ContactMsg } from '../classContactMsg/ContactMsg';
import '../cssRules/Body.css';

const ContactMsgTable: React.FC = () => {
  const [msgs, setMsgs] = useState<ContactMsg[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('msgs');
    if (saved) {
      const parsed = JSON.parse(saved).map((m: any) =>
        new ContactMsg(m.msgId, m.name, m.message)
      );
      setMsgs(parsed);
    } else {
      setMsgs([
        new ContactMsg(1, "דוד", "הודעה לדוגמה 1"),
        new ContactMsg(2, "שרה", "הודעה לדוגמה 2")
      ]);
    }
  }, []);

  const addRandomMsg = () => {
    const newMsg = new ContactMsg(
      Math.floor(Math.random() * 1000),
      "שם אקראי",
      "הודעה חדשה"
    );
    setMsgs([...msgs, newMsg]);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('msgs', JSON.stringify(msgs));
    alert("הודעות נשמרו!");
  };

  return (
    <div>
      <button onClick={addRandomMsg}>הוסף הודעה אקראית</button>
      <button onClick={saveToLocalStorage}>שמור ב-localStorage</button>
      <table border={1}>
        <thead>
          <tr>
            <th>msgId</th>
            <th>name</th>
            <th>message</th>
          </tr>
        </thead>
        <tbody>
          {msgs.map(m => (
            <tr key={m.msgId}>
              <td>{m.msgId}</td>
              <td>{m.name}</td>
              <td>{m.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactMsgTable;
