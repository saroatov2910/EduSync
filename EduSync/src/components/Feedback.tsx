import React, { useState } from 'react';
import { Feedback } from '../classes/feedback';
import '../cssRules/Body.css';

const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    new Feedback(1, 101, "שירות מעולה", 5),
    new Feedback(2, 102, "יכול להשתפר", 3)
  ]);

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>id</th>
          <th>studentId</th>
          <th>comments</th>
          <th>rating</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.map(f => (
          <tr key={f.id}>
            <td>{f.id}</td>
            <td>{f.studentId}</td>
            <td>{f.comments}</td>
            <td>{f.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeedbackTable;
