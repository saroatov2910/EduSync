import React, { useEffect, useState } from "react";
import Feedback, { type FeedbackProps } from "../classFeedback/Feedback";
import "../cssRules/Body.css";

/** Factory to build a valid FeedbackProps object from a minimal input.
 *  This shields the component from all required fields of Student/Request/Feedback models.
 */
function makeFeedbackProps(input: {
  feedbackId: number;
  studentId: number;
  comment: string;
}): FeedbackProps {
  const now = new Date();

  return {
    // --- Student (base class) ---
    studentId: input.studentId,
    firstName: "Demo",
    lastName: "Student",
    email: "demo.student@example.com",
    mobile: "0501234567",
    major: "Computer Science",

    // --- Request (parent class of Feedback) ---
    requestId: 1000 + Math.floor(Math.random() * 9000),
    requestTopic: "General" as any, // TODO: replace with a real RequestTopic value if you have an enum
    requestText: input.comment,
    requestDate: now,
    reqStatus: "Open" as any,        // TODO: replace with a real RequestStatus value if you have an enum
    handlerId: 1,

    // --- Feedback (current class) ---
    feedbackId: input.feedbackId,
    grade: 100 as any,               // TODO: replace with a real `grade` value if you have an enum/range
    comment: input.comment,
    createdBy: "Teacher" as any,     // TODO: replace with a real `createdBy` value if you have an enum
    feedbackDate: now,
  };
}

/** Minimal shape persisted to localStorage to avoid deep class serialization. */
type PersistedFeedbackLite = {
  feedbackId: number;
  studentId: number;
  comment: string;
};

const STORAGE_KEY = "feedbacks";


const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    // Load from localStorage (lite format) and rebuild class instances
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: PersistedFeedbackLite[] = JSON.parse(saved);
      const rebuilt = parsed.map((f) => new Feedback(makeFeedbackProps(f)));
      setFeedbacks(rebuilt);
    } else {
      setFeedbacks([
        new Feedback(makeFeedbackProps({ feedbackId: 1, studentId: 101, comment: "Sample feedback 1" })),
        new Feedback(makeFeedbackProps({ feedbackId: 2, studentId: 102, comment: "Sample feedback 2" })),
      ]);
    }
  }, []);

  /** Add a new random feedback for demo purposes. */
  const addRandomFeedback = () => {
    const newF = new Feedback(
      makeFeedbackProps({
        feedbackId: Math.floor(Math.random() * 1000),
        studentId: 100 + Math.floor(Math.random() * 100),
        comment: "New feedback",
      })
    );
    setFeedbacks((prev) => [...prev, newF]);
  };

  /** Save a lite version to localStorage (id, studentId, comment). */
  const saveToLocalStorage = () => {
    const lite: PersistedFeedbackLite[] = feedbacks.map((f) => ({
      feedbackId: f.feedbackId,
      studentId: f.StudentId, // comes from the Student base class (note the capital S)
      comment: f.comment,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lite));
    alert("Feedbacks saved!");
  };

  return (
    <div>
      <button onClick={addRandomFeedback}>Add random feedback</button>
      <button onClick={saveToLocalStorage}>Save to localStorage</button>

      <table border={1}>
        <thead>
          <tr>
            <th>feedbackId</th>
            <th>studentId</th>
            <th>comment</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((f) => (
            <tr key={f.feedbackId}>
              <td>{f.feedbackId}</td>
              <td>{f.StudentId}</td>
              <td>{f.comment}</td> {/* use `comment`, not `message` */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
