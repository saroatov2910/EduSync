// קובץ תקין עם naming conventions נכונים

export const calculateTotalScore = (scores: number[]): number => {
  return scores.reduce((sum, score) => sum + score, 0);
};

export const formatUserName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

export interface UserData {
  id: number;
  name: string;
  email: string;
}

export const MAX_STUDENTS_PER_CLASS = 30;