// Student.ts

export default class Student {
    StudentId: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    major: string;
  
    constructor(
      StudentId: string,
      firstName: string,
      lastName: string,
      email: string,
      mobile: string,
      major: string
    ) {
      this.StudentId = StudentId.trim();
      this.firstName = firstName.trim();
      this.lastName = lastName.trim();
      this.email = email.trim();
      this.mobile = mobile.trim();
      this.major = major.trim();
    }
  
    /**
     *  בנאי מאובייקט plain (לקריאה מ־localStorage) */
    static from(obj: unknown): Student {
      const o = obj as Record<string, unknown>;
      return new Student(
        String(o.id ?? ""),
        String(o.firstName ?? ""),
        String(o.lastName ?? ""),
        String(o.email ?? ""),
        String(o.mobile ?? ""),
        String(o.major ?? "")
      );
    }
  
    /** יצירת סטודנט אקראי (שומר על ייחודיות מול מזהים קיימים אם הועברו) */
    static random(existingIds: Set<string> = new Set()): Student {
      // מזהה ייחודי 6–10 ספרות
      let id: string;
      do {
        const len = 7 + Math.floor(Math.random() * 2); // 7–8 ספרות (אפשר להרחיב ל-6–10)
        id = Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join("");
      } while (existingIds.has(id));
  
      const firstNames = ["אלה", "דניאל", "מיה", "נועם", "איתמר", "טל", "ליאן", "יואב"];
      const lastNames  = ["כהן", "לוי", "מזרחי", "חדד", "פרץ", "ביטון", "דהאן", "שרעבי"];
      const majors     = ["מדעי המחשב", "כלכלה", "ביולוגיה", "חשבונאות", "חינוך", "פסיכולוגיה"];
  
      const fn = pick(firstNames);
      const ln = pick(lastNames);
      const domain = pick(["uni.ac.il", "campus.edu", "student.college.il"]);
      const email = `${transliterate(fn)}.${transliterate(ln)}@${domain}`.toLowerCase();
      const mobile = randomIsraeliMobile();
      const major = pick(majors);
  
      return new Student(id, fn, ln, email, mobile, major);
    }
  
    /** ולידציה עסקית לפי הדרישות */
    validate(): string[] {
      const errors: string[] = [];
  
      // מזהה
      if (!this.id) errors.push("מספר סטודנט הוא שדה חובה");
      if (!/^[0-9]{6,10}$/.test(this.id)) errors.push("מספר סטודנט חייב להכיל 6–10 ספרות");
  
      // דוא"ל
      if (!this.email) errors.push('דוא"ל הוא שדה חובה');
      if (this.email && !isValidEmail(this.email)) errors.push('פורמט דוא"ל אינו תקין');
  
      // מובייל
      if (!this.mobile) errors.push("טלפון נייד הוא שדה חובה");
      if (this.mobile && !/^05\d{8}$/.test(this.mobile)) {
        errors.push("מספר נייד חייב להיות בפורמט ישראלי 05xxxxxxxx");
      }
  
      // תואר/חוג
      if (!this.major) errors.push("תואר/חוג הוא שדה חובה");
  
      // שמות (לא נכתב במפורש חובה, אבל הגיוני לבדוק)
      if (!this.firstName) errors.push("שם פרטי נדרש");
      if (!this.lastName) errors.push("שם משפחה נדרש");
  
      return errors;
    }
  }
  
  
  function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function isValidEmail(email: string): boolean {
    // בדיקת אימייל "קלה" אך פרקטית
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }
  
  function randomIsraeliMobile(): string {
    // 05xxxxxxxx (סה"כ 10 ספרות)
    const prefixes = ["050", "052", "053", "054", "055", "057", "058"];
    const prefix = pick(prefixes);
    const rest = String(Math.floor(10000000 + Math.random() * 90000000)); // 8 ספרות
    return prefix + rest.slice(0, 7); // הבטחת אורך כולל 10 (prefix=3 + rest.slice(0,7)=7)
    // לחלופין: const rest = String(Math.floor(1000000 + Math.random() * 9000000)).padStart(7,'0')
  }
  
  function transliterate(str: string): string {
    // טרנסליטרציה בסיסית לעברית → לטינית (לטרמינל של אימייל)
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
  