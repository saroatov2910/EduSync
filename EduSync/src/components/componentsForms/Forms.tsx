import { useFormState } from "react-dom";
import { useState } from "react";

 export default function Forms() {
    const [formState, setFormState] = useFormState({
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
    
    const handleSubmit = (event) => {
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
    
    const validateForm = (data) => {
        const errors = [];
        
        if (!data.studentId) errors.push("Student ID is required.");
        if (!data.firstName) errors.push("First name is required.");
        if (!data.lastName) errors.push("Last name is required.");
        
        // Add more validation as needed
    
        return errors;
    };
    
    return (
        <form onSubmit={handleSubmit}>
        {/* Form fields go here */}
        <button type="submit">Submit</button>
        {errors.length > 0 && <div className="error">{errors.join(", ")}</div>}
        </form>
    );


 }
    