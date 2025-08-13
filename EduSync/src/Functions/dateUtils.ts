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

