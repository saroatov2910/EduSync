// Request.ts
import Student from './Student';
// Utility functions
export default class Request extends Student {
  requestId: string;
  requestText: string;
  requestDate: string;
  reqStatus: string;

// Constructor to initialize Request object
  constructor(
    studentId: string,
    firstName: string,
    lastName: string,
    email: string,
    requestId: string,
    requestText: string,
    requestDate: string,
    reqStatus: string
  ) {
    // Call the parent constructor
    super(studentId, firstName, lastName, email); 
    this.requestId = requestId;
    this.requestText = requestText;
    this.requestDate = requestDate;
    this.reqStatus = reqStatus;
  }
// Method to create a Request object from a plain object
  printInfo(): void {
    console.log(`Request ID: ${this.requestId}`);
    console.log(`Student ID: ${this.StudentId}`);
    console.log(`Name: ${this.firstName} ${this.lastName}`);
    console.log(`Email: ${this.email}`);
    console.log(`Request Text: ${this.requestText}`);
    console.log(`Request Date: ${this.requestDate}`);
    console.log(`Status: ${this.reqStatus}`);
  }
}
