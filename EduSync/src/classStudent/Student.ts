//****** 
// class Student.ts
// Represents a student in the EduSync system
// Contains properties like StudentId, firstName, lastName, email, mobile, and major
// Provides methods for validation, creation from plain objects, and random generation
// */

export default class Student {
  StudentId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  major: string;

  constructor(
    StudentId: number,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    major: string
  ) {
    this.StudentId = StudentId; // number – no trim
    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
    this.email = email.trim();
    this.mobile = mobile.trim();
    this.major = major.trim();
  }

  /** Constructor from plain object (for reading from localStorage) */
  static from(obj: unknown): Student {
    const o = obj as Record<string, unknown>;
    const idNum = Number(
      (o.StudentId as number | string | undefined) ??
      (o.id as number | string | undefined) ?? 0
    );

    return new Student(
      idNum,
      String(o.firstName ?? ""),
      String(o.lastName ?? ""),
      String(o.email ?? ""),
      String(o.mobile ?? ""),
      String(o.major ?? "")
    );
  }

}