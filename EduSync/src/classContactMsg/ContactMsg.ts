import Request from '../classRequest/Request';

export default class ContactMsg extends Request {
  msgContent: string;
  date: Date;
  time: string;

  constructor(
  
    requestId: number,
    msgContent: string,
    date: Date,
    time: string
  ) {
    // Call the constructor of the parent class (Request)
    super(0,requestId, msgContent, date, 'Pending'); 
    
    // Assign additional properties specific to ContactMsg
    this.msgContent = msgContent;
    this.date = date;
    this.time = time;
  }
}