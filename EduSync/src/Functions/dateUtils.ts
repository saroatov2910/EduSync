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
    return { valid: false, error: 'Email must be a non-empty string' };
  }
  const trimmed = email.trim();
  // Improved regex: supports +, dots, and long domain names
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true };
}


export function isValidMobile(mobile: unknown): { valid: boolean; error?: string } {
  if (typeof mobile !== 'string' || mobile.trim() === '') {
    return { valid: false, error: 'Mobile number must be a non-empty string' };
  }

  const trimmed = mobile.trim();
  const mobileRegex = /^05\d{8}$/;

  if (!mobileRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid Israeli mobile number format. Must start with 05 and be 10 digits long' };
  }

  return { valid: true };
}

export function isValidTime (timeStr: string ): boolean {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // Matches HH:MM format
    if (!timeRegex.test(timeStr)) {
        return false; // Invalid time format
    }
    const [hours, minutes] = timeStr.split(':').map(Number);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return false; // Hours must be 0-23 and minutes must be 0-59
    }
    return true; // Valid time format

}


export function isValidStudentId(StudentId: number): boolean {
  // Check if the student ID is a number between 100000 and 9999999999
  return Number.isInteger(StudentId) && StudentId >= 100000 && StudentId <= 9999999999;
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

