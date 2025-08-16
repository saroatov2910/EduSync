// Request.ts
import Student from '../classStudent/Student';
import type { RequestTopic, RequestStatus } from '../RequestStatus';
import { isValidStudentId, validateText, isValidDate } from '../Functions/dateUtils';

export interface RequestProps {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  major: string;
  requestId: number;
  requestTopic: RequestTopic;
  requestText: string;
  requestDate: Date;
  reqStatus: RequestStatus;
  

  handlerId: number;
}


export default class Request extends Student {
  requestId: number;
  requestTopic: RequestTopic;
  requestText: string;
  requestDate: Date;
  reqStatus: RequestStatus;
  handlerId: number; 

  constructor(props: RequestProps) {
    super({
      studentId: props.studentId,
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      mobile: props.mobile,
      major: props.major
    });

    this.requestId = props.requestId;
    this.requestTopic = props.requestTopic;
    this.requestText = props.requestText;
    this.requestDate = props.requestDate;
    this.reqStatus = props.reqStatus;
    
    this.handlerId = props.handlerId;
    
    this.validate();
  }

  protected validate() {
    isValidStudentId(this.studentId);
    validateText(this.requestText);
    isValidDate(this.requestDate);
  }
}
