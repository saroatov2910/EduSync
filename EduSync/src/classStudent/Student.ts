// Student.ts
import { isValidStudentId, validateText, isValidEmail, isValidMobile } from '../Functions/dateUtils';

export interface StudentProps {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  major: string;
}

export default class Student {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  major: string;

  constructor(props: StudentProps) {
    this.studentId = props.studentId;
    this.firstName = props.firstName.trim();
    this.lastName = props.lastName.trim();
    this.email = props.email.trim();
    this.mobile = props.mobile.trim();
    this.major = props.major.trim();

    this.validate();
  }

  protected validate(): void {
    isValidStudentId(this.studentId);
    validateText(this.firstName);
    validateText(this.lastName);
    isValidEmail(this.email);
    isValidMobile(this.mobile);
    validateText(this.major);
  }
}
