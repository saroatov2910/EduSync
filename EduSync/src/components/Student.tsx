import React, { useState } from 'react';
import { Student } from '../classes/student';
import '../cssRules/Body.css';

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    new Student(101, "דנה ישראלי", 20, "dana@example.com"),
    new Student(102, "יוסי כהן", 22, "yossi@example.com")
  ]);

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>age</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.age}</td>
            <td>{s.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
