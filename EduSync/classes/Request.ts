// Request.ts
import Student from './Student';

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
    this.requestText = requestText;
    this.requestDate = requestDate;
    this.reqStatus = reqStatus;
  }


  }
