// הפרה 8: שם קובץ שאינו ב-PascalCase (help_utilities.ts במקום HelpUtilities.ts)

// הפרה 9: שם פונקציה שאינו ב-camelCase
export const Calculate_Help_Score = (userRating: number, helpfulness: number): number => {
  return (userRating + helpfulness) / 2;
};

// הפרה 10: שם פונקציה עם Pascal_Snake_Case
export const Format_Help_Message = (userName: string, message: string): string => {
  return `${userName}: ${message}`;
};

// הפרה 11: interface שאינו ב-PascalCase
export interface help_data {
  id: number;
  title: string;
  content: string;
  category: string;
}

// הפרה 12: קבוע שאינו ב-UPPER_SNAKE_CASE
export const maxHelpSections = 10;

// הפרה 13: טיפוס שאינו ב-PascalCase
export type help_category = 'general' | 'technical' | 'account' | 'billing';