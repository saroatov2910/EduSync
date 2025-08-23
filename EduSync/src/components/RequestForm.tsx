//טופס להוספה / עריכה של בקשות (studentId, description)
import React, { useState } from 'react';
export default function RequestForm() {
  const [studentId, setStudentId] = useState('');
  const [description, setDescription] = useState('');

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  return (
    <div>
      <form className="request-form" onSubmit={handleAddRequest}>
        <label>Student ID:</label>
        <input type="text" name="studentId" value={studentId}
        onChange={(e) => setStudentId(e.target.value)} required />

        <label>Description:</label>
        <input type="text" name="description" value={description}  
        onChange={(e) => setDescription(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

