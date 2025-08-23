//טופס להוספה / עריכה של סטודנט (firstName, lastName, email, mobile, major)

import React, { useState } from "react";

export default function StudentForm() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [major, setMajor] = React.useState("");

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
        <input type="tel" name="mobile" required />

        <label>Major:</label>
        <input type="text" name="major" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
