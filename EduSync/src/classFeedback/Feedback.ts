import Request from '../classRequest/Request';
import type { createdBy ,grade  } from '../RequestStatus';
import { isValidNumber, validateText } from '../Functions/dateUtils';

export default class Feedback extends Request {
    feedbackId: number;
    grade: grade;
    comment: string;
    createdBy: createdBy
    feedbackDate: Date;

    constructor(
        studentId: number,
        requestId: number,
        requestText: string,
        requestDate: Date,
        reqStatus: string,
        feedbackId: number,
        grade: grade,
        comment: string,
        createdBy: createdBy
        feedbackDate: Date
    ) {
        super(studentId, requestId, requestText, requestDate, reqStatus);
        this.feedbackId = feedbackId;
        this.grade = grade;
        this.comment = comment;
        this.createdBy = createdBy;
        this.feedbackDate = feedbackDate;

        this.validate();
    }

        protected validate() {
            isValidNumber(this.feedbackId);
            isValidNumber(this.grade);
            validateText(this.comment);
            isValidDate(this.feedbackDate);


        }
  
}
