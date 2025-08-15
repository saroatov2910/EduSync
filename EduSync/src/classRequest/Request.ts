// Request.ts
import Student from '../classStudent/Student';
import { isValidDate, validateText } from '../Functions/dateUtils';
import


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


  }

}
