import React, { useState } from 'react';
import { CareHandler } from '../classes/carehandler';
import '../cssRules/Body.css';

const CareHandlerTable: React.FC = () => {
  const [careHandlers, setCareHandlers] = useState<CareHandler[]>([
    new CareHandler(1, "יעל כהן", "050-1234567", "yael@example.com"),
    new CareHandler(2, "דני לוי", "050-9876543", "dani@example.com")
  ]);

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>phone</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        {careHandlers.map(c => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.name}</td>
            <td>{c.phone}</td>
            <td>{c.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CareHandlerTable;
