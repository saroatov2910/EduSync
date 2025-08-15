export function validateText(value: unknown, maxLength: number = 500): { valid: boolean; error?: string } {
    // Check if the value is a string and not empty, and if it exceeds the maximum length
  if (typeof value !== 'string' || value.trim() === '') {
    return { valid: false, error: 'The field must be a non-empty string' };
  }
  if (value.length > maxLength) {
    return { valid: false, error: `The field exceeds the limit of ${maxLength} characters` };
  }
  return { valid: true };
}

export function isValidDate(value: unknown): { valid: boolean; error?: string } {
    let date: Date;

    if (typeof value === 'string') {
        date = new Date(value);
    } else if (value instanceof Date) {
        date = value;
    } else {
        return { valid: false, error: 'The value must be a string or Date object' };
    }

    if (isNaN(date.getTime())) {
        return { valid: false, error: 'Invalid date format' };
    }
    return { valid: true };
}




export function isValidEmail(email: unknown): { valid: boolean; error?: string } {
  if (typeof email !== 'string' || email.trim() === '') {
    return { valid: false, error: 'דוא"ל חייב להיות מחרוזת לא ריקה' };
  }
  const trimmed = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'פורמט דוא"ל אינו תקין' };
  }
  return { valid: true };
}


export function isValidMobile(mobile: string): boolean {
  // Check if the mobile number is a string of 10 digits starting with '05'
  const mobileRegex = /^05\d{8}$/;
  return mobileRegex.test(mobile);
}


export function isValidStudentId(studentId: number): boolean {
  // Check if the student ID is a number between 100000 and 9999999999
  return Number.isInteger(studentId) && studentId >= 100000 && studentId <= 9999999999;
}

export function isValidNumber(value: number): boolean {
  // Check if the value is a finite number
  return Number.isFinite(value);
}

export function trim(str: string): string {
    // Return an empty string if the input isn't a string to prevent errors.
    if (typeof str !== 'string') {
        return '';
    }
    // Use the built-in trim() method for reliable whitespace removal.
    return str.trim();
}

