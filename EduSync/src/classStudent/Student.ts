
export default class Student {
  StudentId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  major: string;

  cconstructor(
    StudentId: number,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    major: string
  ) {
    this.StudentId = StudentId;
    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
    this.email = email.trim();
    this.mobile = mobile.trim();
    this.major = major.trim();
  }



}