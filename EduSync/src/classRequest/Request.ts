// Request.ts
import Student from '../classStudent/Student';
import type { RequestTopic, RequestStatus } from '../RequestStatus';
import { isValidStudentId,validateText, isValidDate } from '../Functions/Utils';

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
      StudentId: props.studentId,
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

    this.validate(); // אפשר גם להשתמש בתוצאה אם תרצה לזרוק חריגה
  }

  public validate(): string[] {
    const errs = super.validate();
  
    try { isValidStudentId(this.StudentId); } catch (e:any) { errs.push(e?.message ?? "StudentId לא תקין"); }
    try { validateText(this.requestText); }  catch { errs.push("טקסט בקשה לא תקין"); }
    try { isValidDate(this.requestDate); }   catch { errs.push("תאריך בקשה לא תקין"); }
  
    return errs;
  }
  }
