export function isValidDate(value: string | Date): boolean {
    if (typeof value === 'string') {
        const date = new Date(value);
        return !isNaN(date.getTime());
    } else if (value instanceof Date) {
        return !isNaN(value.getTime());
    }
    return false;
}

