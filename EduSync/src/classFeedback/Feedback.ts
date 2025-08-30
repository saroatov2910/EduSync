import Request, { type RequestProps } from '../classRequest/Request';
import type { createdBy, grade, RequestStatus } from '../RequestStatus';
import { isValidNumber, validateText, isValidDate } from '../Functions/Utils';

export interface FeedbackProps extends RequestProps {
  feedbackId: number;
  grade: grade;           // אם זה enum לא-מספרי, נעדכן את הבדיקה למטה
  comment: string;
  createdBy: createdBy;
  feedbackDate: Date;
}

export default class Feedback extends Request {
  feedbackId: number;
  grade: grade;
  comment: string;
  createdBy: createdBy;
  feedbackDate: Date;

  constructor(props: FeedbackProps) {
    super({
      studentId: props.studentId,
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      mobile: props.mobile,
      major: props.major,
      requestId: props.requestId,
      requestTopic: props.requestTopic,
      requestText: props.requestText,
      requestDate: props.requestDate,
      reqStatus: props.reqStatus as RequestStatus,
      handlerId: props.handlerId,
    });

    this.feedbackId = props.feedbackId;
    this.grade = props.grade;
    this.comment = props.comment;
    this.createdBy = props.createdBy;
    this.feedbackDate = props.feedbackDate;

    this.validate();
  }

  public override validate(): string[] {
    const errs = super.validate();

    try { isValidNumber(this.feedbackId); }
    catch { errs.push("מזהה משוב לא תקין"); }

    // אם grade הוא enum מילולי, המרה למספר לא תתאים – עדכן את הבדיקה בהתאם להגדרה שלך
    try { isValidNumber(Number(this.grade)); }
    catch { errs.push("ציון/דרגת משוב לא תקינה"); }

    try { validateText(this.comment); }
    catch { errs.push("תגובה/הערה לא תקינה"); }

    try { isValidDate(this.feedbackDate); }
    catch { errs.push("תאריך משוב לא תקין"); }

    return errs;
  }
}
