import React, { useEffect, useState, useMemo } from "react";
import Student from "../classStudent/Student";
import "../cssRules/Body.css";

const LS_STUDENTS = "students_v1";

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  // load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_STUDENTS);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setStudents(arr.map(Student.from));
      }
    } catch (e) {
      console.error("failed to load students", e);
    }
  }, []);

  const existingIds = useMemo(() => new Set(students.map(s => s.StudentId)), [students]);

  const addRandom = () => {
    const s = Student.random(existingIds);
    const errs = s.validate();
    if (errs.length) return alert("שגיאות:\n" + errs.join("\n"));
    setStudents(prev => [...prev, s]);
  };

  const save = () => {
    try {
      localStorage.setItem(LS_STUDENTS, JSON.stringify(students));
      alert("נשמר ל-localStorage");
    } catch {
      alert("שגיאה בשמירה");
    }
  };

  return (
    <>
      <div className="actions">
        <button onClick={addRandom}>הוסף סטודנט אקראי</button>
        <button onClick={save}>שמור ל-localStorage</button>
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>StudentId</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>mobile</th>
            <th>major</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.StudentId}>
              <td>{s.StudentId}</td>
              <td>{s.firstName}</td>
              <td>{s.lastName}</td>
              <td>{s.email}</td>
              <td>{s.mobile}</td>
              <td>{s.major}</td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr><td colSpan={6}>אין נתונים</td></tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default StudentTable;
