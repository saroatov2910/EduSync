import React, { useState, useEffect } from 'react';
import { Feedback } from '../classes/feedback';
import '../cssRules/Body.css';

const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('feedbacks');
    if (saved) {
      const parsed = JSON.parse(saved).map((f: any) =>
        new Feedback(f.feedbackId, f.studentId, f.message)
      );
      setFeedbacks(parsed);
    } else {
      setFeedbacks([
        new Feedback(1, 101, "משוב לדוגמה 1"),
        new Feedback(2, 102, "משוב לדוגמה 2")
      ]);
    }
  }, []);

  const addRandomFeedback = () => {
    const newFeedback = new Feedback(
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 100),
      "משוב חדש"
    );
    setFeedbacks([...feedbacks, newFeedback]);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    alert("משובים נשמרו!");
  };

  return (
    <div>
      <button onClick={addRandomFeedback}>הוסף משוב אקראי</button>
      <button onClick={saveToLocalStorage}>שמור ב-localStorage</button>
      <table border={1}>
        <thead>
          <tr>
            <th>feedbackId</th>
            <th>studentId</th>
            <th>message</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(f => (
            <tr key={f.feedbackId}>
              <td>{f.feedbackId}</td>
              <td>{f.studentId}</td>
              <td>{f.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
