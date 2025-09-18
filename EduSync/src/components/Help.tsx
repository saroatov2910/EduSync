import React from 'react';
import '../cssRules/HelpStyles.css';

const Help: React.FC = () => {
  
  const displayHelpInstructions = () => {
    const instructionArray = [
      "Navigate using the menu bar",
      "Use search to find specific information",
      "Contact support for additional help"
    ];
    
    return (
      <>
        <p>
          Welcome to the EduSync Help Center. Here you can find useful information and guidelines for using the system.
        </p>
        <h3>Getting Started</h3>
        <ol className="help-instruction-list">
          {instructionArray.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </>
    );
  };

  return (
    <div className="help-container">
      <h1 className="help-title-style">
        Help
      </h1>
      <div className="help-text-content">
        {displayHelpInstructions()}
      </div>
      <h3>Additional Resources</h3>
      <ul>
        <li>Check the FAQ section for common questions</li>
        <li>Contact system administrator for technical issues</li>
        <li>Use the feedback form to suggest improvements</li>
      </ul>
    </div>
  );
};

export default Help;