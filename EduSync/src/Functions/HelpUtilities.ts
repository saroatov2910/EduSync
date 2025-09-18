// קובץ מתוקן עם naming conventions נכונים

export const calculateHelpScore = (userRating: number, helpfulness: number): number => {
  return (userRating + helpfulness) / 2;
};

export const formatHelpMessage = (userName: string, message: string): string => {
  return `${userName}: ${message}`;
};

export interface HelpData {
  id: number;
  title: string;
  content: string;
  category: string;
}

export const MAX_HELP_SECTIONS = 10;

export type HelpCategory = 'general' | 'technical' | 'account' | 'billing';