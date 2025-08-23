import { useState } from "react";

 export default function Forms() {
    type FormData = {
        studentId: string;
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
        major: string;
        requestId: number;
        requestTopic: string;
        requestText: string;
        requestDate: Date;
        reqStatus: string;
        handlerId: number;
    };

    const [formState, setFormState] = useState<FormData>({
        studentId: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        major: "",
        requestId: 0,
        requestTopic: "",
        requestText: "",
        requestDate: new Date(),
        reqStatus: "",
        handlerId: 0
    });
    
    const [errors, setErrors] = useState<string[]>([]);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Validate form data
        const validationErrors = validateForm(formState);
        
        if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
        }
    
        // Submit form data
        console.log("Form submitted successfully", formState);
    };
    
    const validateForm = (data: FormData) => {
        const errors: string[] = [];
        
        if (!data.studentId) errors.push("Student ID is required.");
        if (!data.firstName) errors.push("First name is required.");
        if (!data.lastName) errors.push("Last name is required.");
        
        // Add more validation as needed
    
        return errors;
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Student ID"
                value={formState.studentId}
                onChange={e => setFormState({ ...formState, studentId: e.target.value })}
            />
            <input
                type="text"
                placeholder="First Name"
                value={formState.firstName}
                onChange={e => setFormState({ ...formState, firstName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={formState.lastName}
                onChange={e => setFormState({ ...formState, lastName: e.target.value })}
            />
            {/* Add more fields as needed */}
            <button type="submit">Submit</button>
            {errors.length > 0 && <div className="error">{errors.join(", ")}</div>}
        </form>
    );


 }
    