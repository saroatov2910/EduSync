// Student.ts

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
      this.StudentId = StudentId;             // number – no trim
      this.firstName = firstName.trim();
      this.lastName = lastName.trim();
      this.email = email.trim();
      this.mobile = mobile.trim();
      this.major = major.trim();
    }
  
    /**
     * Constructor from plain object (for reading from localStorage)
     */
    static from(obj: unknown): Student {
      const o = obj as Record<string, unknown>;
      // Support both "StudentId" and "id" keys when reading from storage:
      const idNum = Number((o.StudentId as number | string | undefined) ?? (o.id as number | string | undefined) ?? 0);
  
      return new Student(
        idNum,
        String(o.firstName ?? ""),
        String(o.lastName ?? ""),
        String(o.email ?? ""),
        String(o.mobile ?? ""),
        String(o.major ?? "")
      );
    }
  
    /** Create a random student (ensures uniqueness compared to existing IDs if provided) */
    static random(existingIds: Set<number> = new Set()): Student {
      // Unique ID 6–10 digits (we'll generate 7–8 here; adjust as needed)
      let idStr: string;
      let idNum: number;
      do {
        const len = 7 + Math.floor(Math.random() * 2); // 7–8 digits
        idStr = Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join("");
        idNum = Number(idStr);
      } while (existingIds.has(idNum));
  
      const firstNames = ["אלה", "דניאל", "מיה", "נועם", "איתמר", "טל", "ליאן", "יואב"];
      const lastNames  = ["כהן", "לוי", "מזרחי", "חדד", "פרץ", "ביטון", "דהאן", "שרעבי"];
      const majors     = ["מדעי המחשב", "כלכלה", "ביולוגיה", "חשבונאות", "חינוך", "פסיכולוגיה"];
  
      const fn = pick(firstNames);
      const ln = pick(lastNames);
      const domain = pick(["uni.ac.il", "campus.edu", "student.college.il"]);
      const email = `${transliterate(fn)}.${transliterate(ln)}@${domain}`.toLowerCase();
      const mobile = randomIsraeliMobile();
      const major = pick(majors);
  
      return new Student(idNum, fn, ln, email, mobile, major);
    }
  
    /** Business validation according to requirements */
    validate(): string[] {
      const errors: string[] = [];
  
      // ID
      const idStr = String(this.StudentId);
      if (!Number.isFinite(this.StudentId)) errors.push("מספר סטודנט הוא שדה חובה");
      if (!/^[0-9]{6,10}$/.test(idStr)) errors.push("מספר סטודנט חייב להכיל 6–10 ספרות");
  
      // Email
      if (!this.email) errors.push('דוא"ל הוא שדה חובה');
      if (this.email && !isValidEmail(this.email)) errors.push('פורמט דוא"ל אינו תקין');
  
      // Mobile
      if (!this.mobile) errors.push("טלפון נייד הוא שדה חובה");
      if (this.mobile && !/^05\d{8}$/.test(this.mobile)) {
        errors.push("מספר נייד חייב להיות בפורמט ישראלי 05xxxxxxxx");
      }
  
      // Major
      if (!this.major) errors.push("תואר/חוג הוא שדה חובה");
  
      // Names (not explicitly stated as required, but logically should be checked)
      if (!this.firstName) errors.push("שם פרטי נדרש");
      if (!this.lastName) errors.push("שם משפחה נדרש");
  
      return errors;
    }
  }
  
  /* ===== helpers ===== */
  
  function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function isValidEmail(email: string): boolean {
    // Simple but practical email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }
  
  function randomIsraeliMobile(): string {
    // 05xxxxxxxx (total 10 digits)
    const prefixes = ["050", "052", "053", "054", "055", "057", "058"];
    const prefix = pick(prefixes);
    const rest = String(Math.floor(10000000 + Math.random() * 90000000)); // 8 digits
    return prefix + rest.slice(0, 7); // Ensure total length 10 (3 + 7)
    // Alternatively: const rest = String(Math.floor(1000000 + Math.random() * 9000000)).padStart(7,'0')
  }
  
  function transliterate(str: string): string {
    // Basic Hebrew → Latin transliteration (for email username)
    const map: Record<string, string> = {
      א:"a", ב:"b", ג:"g", ד:"d", ה:"h", ו:"v", ז:"z", ח:"h", ט:"t",
      י:"y", כ:"k", ך:"k", ל:"l", מ:"m", ם:"m", נ:"n", ן:"n", ס:"s",
      ע:"a", פ:"p", ף:"p", צ:"ts", ץ:"ts", ק:"k", ר:"r", ש:"sh", ת:"t",
      " ":".", "'":"", "\"":"", ".":"", "-":"-",
    };
    return str
      .split("")
      .map(c => map[c] ?? c)
      .join("")
      .replace(/[^a-zA-Z0-9_.-]/g, "");
  }
  