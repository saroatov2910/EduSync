export function validateText(value: string): boolean {
  // Check if the value is a string and not just whitespace.
  if (typeof value !== 'string' || value.trim() === '') {
    return false;
  }
  const MAX_LENGTH = 500;
  if (value.length > MAX_LENGTH) {
    return false;
  }
  
  return true;
}

export function isValidDate(value: string | Date): boolean {
    if (typeof value === 'string') {
        const date = new Date(value);
        return !isNaN(date.getTime());
    } else if (value instanceof Date) {
        return !isNaN(value.getTime());
    }
    return false;
}

export function isValidEmail(email: string): boolean {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
  
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