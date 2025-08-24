// src/components/ContactMsg.tsx
import React, { useState, useEffect } from 'react';
import ContactMsg from '../classContactMsg/ContactMsg';
import type { createdBy } from '../RequestStatus';
import '../cssRules/Body.css';

const ContactMsgTable: React.FC = () => {
  const [msgs, setMsgs] = useState<ContactMsg[]>([]);

  // Helper: serialize to a plain object for localStorage
  const toPlain = (m: ContactMsg) => ({
    msgId: m.msgId,
    createdBy: m.createdBy,
    requestId: m.requestId,
    requestText: m.requestText,
    requestDate: m.requestDate.toISOString(),
  });

  useEffect(() => {
    const saved = localStorage.getItem('msgs');
    if (saved) {
      try {
        const arr = JSON.parse(saved) as Array<any>;
        const parsed = arr.map(
          (m) =>
            new ContactMsg({
              msgId: Number(m.msgId),
              createdBy: m.createdBy as createdBy,
              requestId: Number(m.requestId),
              requestText: String(m.requestText),
              requestDate: new Date(m.requestDate),
            })
        );
        setMsgs(parsed);
      } catch {
        // If parsing fails, start with a couple of defaults
        setMsgs([
          new ContactMsg({
            msgId: 1,
            createdBy: 'Student' as createdBy, // adjust to your actual union if different
            requestId: 101,
            requestText: 'הודעה לדוגמה 1',
            requestDate: new Date(),
          }),
          new ContactMsg({
            msgId: 2,
            createdBy: 'Student' as createdBy,
            requestId: 102,
            requestText: 'הודעה לדוגמה 2',
            requestDate: new Date(),
          }),
        ]);
      }
    } else {
      // Seed with two sample rows if nothing in storage
      setMsgs([
        new ContactMsg({
          msgId: 1,
          createdBy: 'Student' as createdBy,
          requestId: 101,
          requestText: 'הודעה לדוגמה 1',
          requestDate: new Date(),
        }),
        new ContactMsg({
          msgId: 2,
          createdBy: 'Student' as createdBy,
          requestId: 102,
          requestText: 'הודעה לדוגמה 2',
          requestDate: new Date(),
        }),
      ]);
    }
  }, []);

  // Add a random message (demo)
  const addRandomMsg = () => {
    const newMsg = new ContactMsg({
      msgId: Math.floor(Math.random() * 100000),
      createdBy: 'Student' as createdBy, // or 'Handler' / any valid value from your RequestStatus.createdBy
      requestId: 100 + Math.floor(Math.random() * 900),
      requestText: 'הודעה חדשה',
      requestDate: new Date(),
    });
    setMsgs((prev) => [...prev, newMsg]);
  };

  // Persist to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('msgs', JSON.stringify(msgs.map(toPlain)));
    alert('הודעות נשמרו!');
  };

  return (
    <div style={{ direction: 'rtl', padding: 16 }}>
      <button onClick={addRandomMsg}>הוסף הודעה אקראית</button>
      <button onClick={saveToLocalStorage} style={{ marginInlineStart: 8 }}>
        שמור ב‑localStorage
      </button>

      <table border={1} style={{ marginTop: 16, width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>msgId</th>
            <th>createdBy</th>
            <th>requestId</th>
            <th>requestText</th>
            <th>requestDate</th>
          </tr>
        </thead>
        <tbody>
          {msgs.map((m) => (
            <tr key={m.msgId}>
              <td>{m.msgId}</td>
              <td>{m.createdBy}</td>
              <td>{m.requestId}</td>
              <td>{m.requestText}</td>
              <td>{new Date(m.requestDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactMsgTable;
