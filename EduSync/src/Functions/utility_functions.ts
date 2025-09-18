// הפרה נוספת: שם קובץ שאינו ב-PascalCase
// הקובץ הזה אמור להיקרא UtilityFunctions.ts

export const calculate_total_score = (scores: number[]): number => {
  return scores.reduce((sum, score) => sum + score, 0);
};

// הפרה נוספת: שם פונקציה שאינו ב-camelCase
export const Format_User_Name = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

// הפרה נוספת: שם interface שאינו ב-PascalCase
export interface user_data {
  id: number;
  name: string;
  email: string;
}

// הפרה נוספת: קבוע שאינו ב-UPPER_SNAKE_CASE
export const maxStudentsPerClass = 30;