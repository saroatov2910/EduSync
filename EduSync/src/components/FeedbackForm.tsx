//טופס להוספה / עריכה של משוב (studentId, comment, grade)
import React, { useState } from 'react';

export default function FeedbackForm() {
  const [studentId, setStudentId] = useState('');
  const [comment, setComment] = useState('');
  const [grade, setGrade] = useState('');

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  return (
    <div>
      <form className="feedback-form" onSubmit={handleAddFeedback}>
        <label>Student ID:</label>
        <input type="text" name="studentId" value={studentId}
        onChange={(e) => setStudentId(e.target.value)} required />

        <label>Comment:</label>
        <input type="text" name="comment" value={comment}  
        onChange={(e) => setComment(e.target.value)} required />

        <label>Grade:</label>
        <input type="text" name="grade" value={grade}  
        onChange={(e) => setGrade(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}