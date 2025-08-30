import { isValidStudentId, validateText, isValidEmail, isValidMobile } from '../Functions/Utils';

export interface StudentProps {
  StudentId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  major: string;
}

export default class Student {
  StudentId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  major: string;

  
  
  

  constructor(props: StudentProps) {
    this.StudentId = props.StudentId;
    this.firstName = props.firstName.trim();
    this.lastName = props.lastName.trim();
    this.email = props.email.trim();
    this.mobile = props.mobile.trim();
    this.major = props.major.trim();

  }


  validate(): string[] {
    const errs: string[] = [];
    try { isValidStudentId(this.StudentId); } catch (e: any) { errs.push(e?.message ?? "StudentId לא תקין"); }
    try { validateText(this.firstName); }   catch (e: any) { errs.push("שם פרטי לא תקין"); }
    try { validateText(this.lastName); }    catch (e: any) { errs.push("שם משפחה לא תקין"); }
    try { isValidEmail(this.email); }       catch (e: any) { errs.push("דוא״ל לא תקין"); }
    try { isValidMobile(this.mobile); }     catch (e: any) { errs.push("נייד לא תקין"); }
    try { validateText(this.major); }       catch (e: any) { errs.push("חוג/תואר לא תקין"); }
    return errs;
  }
  static from(o: any): Student {
    return new Student({
      StudentId: Number(o?.StudentId ?? o?.studentId ?? 0),
      firstName: String(o?.firstName ?? "").trim(),
      lastName: String(o?.lastName ?? "").trim(),
      email: String(o?.email ?? "").trim(),
      mobile: String(o?.mobile ?? "").trim(),
      major: String(o?.major ?? "").trim(),
    });
  }
  static random(existingIds?: Set<number>): Student {
    let id: number;
    do {
      id = 100000 + Math.floor(Math.random() * 900000); // 6 digits
    } while (existingIds?.has(id));

    const firstNames = ["Dana", "Noa", "Gal", "Shahar", "Lior", "Ido"];
    const lastNames  = ["Levi", "Cohen", "Mizrahi", "Aviv", "Rosen", "Bar"];
    const majors     = ["Computer Science", "Education", "Math", "Economics", "Biology"];

    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const major = majors[Math.floor(Math.random() * majors.length)];

    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`;
    const mobile = "05" + Math.floor(100000000 + Math.random() * 900000000).toString().slice(1, 9); //format : 05XXXXXXXX 
    return new Student({
      StudentId: id,
      firstName: fn,
      lastName: ln,
      email,
      mobile,
      major,
    });
  }

}
