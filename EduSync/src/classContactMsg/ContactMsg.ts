// ContactMsg.ts
import type { createdBy} from '../RequestStatus';
import { validateText, isValidDate ,isValidNumber} from '../Functions/Utils';


export interface ContactMsgProps {
  msgId: number;
  createdBy: createdBy;
  requestId: number;
  requestText: string;
  requestDate: Date;
}

export default class ContactMsg {
  msgId: number;
  createdBy: createdBy;
  requestId: number;
  requestText: string;
  requestDate: Date;

  constructor(props: ContactMsgProps) {
    this.msgId = props.msgId;
    this.createdBy = props.createdBy;
    this.requestId = props.requestId;
    this.requestText = props.requestText;
    this.requestDate = props.requestDate;

    this.validate();
  }

protected validate(): void {
    isValidNumber(this.msgId);
    validateText(this.requestText);
    isValidDate(this.requestDate);
    isValidNumber(this.requestId);
  }
}
