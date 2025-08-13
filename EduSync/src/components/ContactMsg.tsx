import React, { useState } from 'react';
import { ContactMsg } from '../classes/contactmsg';
import '../cssRules/Body.css';

const ContactMsgTable: React.FC = () => {
  const [messages, setMessages] = useState<ContactMsg[]>([
    new ContactMsg(1, "רונית", "ronit@example.com", "שלום, יש לי שאלה", new Date("2025-08-10")),
    new ContactMsg(2, "משה", "moshe@example.com", "איך ליצור קשר?", new Date("2025-08-11"))
  ]);

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>message</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {messages.map(m => (
          <tr key={m.id}>
            <td>{m.id}</td>
            <td>{m.name}</td>
            <td>{m.email}</td>
            <td>{m.message}</td>
            <td>{m.date.toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactMsgTable;
