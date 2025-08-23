//טופס להוספה / עריכה של סטודנט (firstName, lastName, email, mobile, major)
import React, { useState } from "react";

export default function StudentForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [major, setMajor] = useState("");

  const handleAddStutent = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  return (
    <div>
      <form className="student-form" onSubmit={handleAddStutent}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={firstName}
        onChange={(e) => setFirstName(e.target.value)} required />

        <label>Last Name:</label>
        <input type="text" name="lastName"  value={lastName} 
        onChange={(e) => setLastName(e.target.value)}required />


        <label>Email:</label>
        <input type="email" name="email" value={email}
        onChange={(e) => setEmail(e.target.value)} required />

        <label>Mobile:</label>
        <input type="tel" name="mobile" value={mobile} 
        onChange={(e) => setMobile(e.target.value)} required />

        <label>Major:</label>
        <input type="text" name="major" value={major}  
        onChange={(e) => setMajor(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
