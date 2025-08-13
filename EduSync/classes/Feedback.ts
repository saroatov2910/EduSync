import { Request } from './Request';

export default class Feedback extends Request {
    feedbackId: number;
    grade: number;
    comment: string;
    createdBy: "סטודנט" | "גורם מטפל";
    feedbackDate: Date;

    constructor(
        feedbackId: number,
        requestId: number,
        grade: number,
        comment: string,
        createdBy: "סטודנט" | "גורם מטפל",
        feedbackDate: Date
    ) {
        super(requestId); // ✅ call parent constructor first
        this.feedbackId = feedbackId;
        this.grade = grade;
        this.comment = comment;
        this.createdBy = createdBy;
        this.feedbackDate = feedbackDate;

        this.validate();
    }

    private validate() {
        if (!this.feedbackId || this.feedbackId <= 0) {
            throw new Error("מזהה משוב חייב להיות קיים וייחודי");
        }

        if (!this.requestId || this.requestId <= 0) {
            throw new Error("מזהה הפנייה חייב להתאים לפנייה קיימת");
        }

        if (this.grade < 1 || this.grade > 5) {
            throw new Error("הציון חייב להיות בין 1 ל-5");
        }

        if (this.comment.length > 300) {
            throw new Error("התגובה החופשית לא יכולה להיות ארוכה מ-300 תווים");
        }

        if (this.createdBy !== "סטודנט" && this.createdBy !== "גורם מטפל") {
            throw new Error('שדה "ניתן על ידי" חייב להיות "סטודנט" או "גורם מטפל"');
        }

        if (!(this.feedbackDate instanceof Date) || isNaN(this.feedbackDate.getTime())) {
            throw new Error("תאריך המשוב אינו תקין");
        }
    }
}
