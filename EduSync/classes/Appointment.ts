import { Request } from "./Request";

export default class Appointment extends Request {
    appointmentId: number;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentType: "זום" | "פרונטלי";
    location: string;
    status: "מתוכננת" | "בוטלה" | "היתקיימה";

    constructor(
        appointmentId: number,
        requestId: number,
        appointmentDate: Date,
        appointmentTime: string,
        appointmentType: "זום" | "פרונטלי",
        location: string,
        status: "מתוכננת" | "בוטלה" | "היתקיימה"
    ) { 
        super(requestId); // ✅ call parent constructor first
        this.appointmentId = appointmentId;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.appointmentType = appointmentType;
        this.location = location;
        this.status = status;

        this.validate();
    }

    private validate() {
        if (!this.appointmentId || this.appointmentId <= 0) {
            throw new Error("מזהה פגישה חייב להיות קיים וייחודי");
        }
        if (!this.requestId || this.requestId <= 0) { // inherited from Request
            throw new Error("מזהה הפנייה חייב להתאים לפנייה קיימת");
        }
        if (!(this.appointmentDate instanceof Date) || isNaN(this.appointmentDate.getTime())) {
            throw new Error("תאריך הפגישה אינו תקין");
        }
        if (this.appointmentDate.getTime() < Date.now()) {
            throw new Error("תאריך הפגישה חייב להיות עתידי");
        }

        if (!this.appointmentTime || !/^\d{2}:\d{2}$/.test(this.appointmentTime)) {
            throw new Error("שעת הפגישה חייבת להיות בפורמט HH:MM");
        }
        const [hours, minutes] = this.appointmentTime.split(":").map(Number);
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            throw new Error("שעת הפגישה אינה תקינה");
        }

        if (this.appointmentType !== "זום" && this.appointmentType !== "פרונטלי") {
            throw new Error('סוג הפגישה חייב להיות "זום" או "פרונטלי"');
        }

        const zoomRegex = /^https?:\/\/(www\.)?zoom\.us\/j\/\d+(\?pwd=.*)?$/;
        const classroomRegex = /^\d{3}$/;
        if (!this.location || (!zoomRegex.test(this.location) && !classroomRegex.test(this.location))) {
            throw new Error("מיקום הפגישה חייב להיות לינק זום תקין או מספר כיתה בעל 3 ספרות");
        }

        if (this.status !== "מתוכננת" && this.status !== "בוטלה" && this.status !== "היתקיימה") {
            throw new Error('סטטוס הפגישה חייב להיות "מתוכננת", "בוטלה" או "היתקיימה"');    
        }
    }
}
