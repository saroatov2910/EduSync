//טופס להוספה / עריכה של גורם מטפל (name, role, email, responsibility)
import React, { useState } from "react";
export default function CareHandlerForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [responsibility, setResponsibility] = useState("");

  const handleAddCareHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  return (
    <div>
      <form className="carehandler-form" onSubmit={handleAddCareHandler}>
        <label>Name:</label>
        <input type="text" name="name" value={name}
        onChange={(e) => setName(e.target.value)} required />

        <label>Role:</label>
        <input type="text" name="role" value={role}
        onChange={(e) => setRole(e.target.value)} required />

        <label>Email:</label>
        <input type="email" name="email" value={email}
        onChange={(e) => setEmail(e.target.value)} required />

        <label>Responsibility:</label>
        <input type="text" name="responsibility" value={responsibility}
        onChange={(e) => setResponsibility(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}