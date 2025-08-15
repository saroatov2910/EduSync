// Request.ts
import Student from '../classStudent/Student';
import { isValidDate, validateText } from '../Functions/dateUtils';

export default class Request extends Student {
  requestId: number;
  requestText: string;
  requestDate: Date; 
  reqStatus: string;

  constructor(
    studentId: number,
    requestId: number,
    requestText: string,
    requestDate: Date, 
    reqStatus: string
  ) {
    super(studentId, '', '', '', '', ''); 

    this.requestId = requestId;

    if (!validateText(requestText)) {
      throw new Error('Request text is invalid');
    }
    this.requestText = requestText;

    if (!isValidDate(requestDate)) {
      throw new Error('Invalid date provided');
    }
    this.requestDate = requestDate;

    this.reqStatus = reqStatus;
  }

  printInfo(): void {
    console.log(`Request ID: ${this.requestId}`);
    console.log(`Student ID: ${this.StudentId}`);
    console.log(`Request Text: ${this.requestText}`);
    console.log(`Request Date: ${this.requestDate}`);
    console.log(`Status: ${this.reqStatus}`);
  }
}
