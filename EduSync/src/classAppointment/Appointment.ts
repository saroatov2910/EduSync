import Request from "../classRequest/Request";
import { isValidStudentId, validateText , isValidDate, isValidTime } from "../Functions/Utils";
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
    // Validate the appointment details
    
 protected validate(): string[] {
    const errs: string[] = super.validate(); 
    try { isValidStudentId(this.StudentId); } catch { errs.push("StudentId invalid"); }
    try { isValidStudentId(this.requestId); } catch { errs.push("RequestId invalid"); }
    try { validateText(this.requestText); } catch { errs.push("Request text invalid"); }
    try { isValidDate(this.requestDate); } catch { errs.push("Appointment date invalid"); }
    try { isValidTime(this.appointmentTime); } catch { errs.push("Appointment time invalid"); }

    return errs;
}

}