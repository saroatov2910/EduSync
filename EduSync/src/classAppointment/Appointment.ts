import Request from "../classRequest/Request";
import { isValidStudentId, validateText , isValidDate, isValidTime } from "../Functions/dateUtils";
import type { RequestStatus ,AppointmentType} from "../RequestStatus";


export default class Appointment extends Request {
    appointmentId: number;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentType: AppointmentType
    location: string;
    status: RequestStatus

    constructor(
        studentId: number,
        requestId: number,
        requestText: string,
        requestDate: Date,
        reqStatus: RequestStatus,
        appointmentId: number,
        appointmentDate: Date,
        appointmentTime: string,
        appointmentType: AppointmentType,
        location: string,
        status:RequestStatus
    ) {
        super(studentId, requestId, requestText, requestDate, reqStatus);
        this.appointmentId = appointmentId;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.appointmentType = appointmentType;
        this.location = location;
        this.status = status;

       
    }
    protected validate(){
        isValidStudentId(this.StudentId);
        isValidStudentId(this.requestId);
        validateText(this.requestText);
        isValidDate(this.requestDate);
        isValidTime(this.appointmentTime);


    }

}