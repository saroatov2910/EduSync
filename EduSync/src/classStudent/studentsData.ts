// src/models/studentsData.ts
import Student from './Student';

const studentsRaw = [
  {
    StudentId: 101,
    firstName: "דניאל",
    lastName: "כהן",
    email: "daniel.cohen@uni.ac.il",
    mobile: "0521234567",
    major: "מדעי המחשב"
  },
  {
    StudentId: 102,
    firstName: "מיה",
    lastName: "לוי",
    email: "mia.levi@uni.ac.il",
    mobile: "0549876543",
    major: "כלכלה"
  },
  {
    StudentId: 103,
    firstName: "יואב",
    lastName: "מזרחי",
    email: "yoav.mizrahi@uni.ac.il",
    mobile: "0501122334",
    major: "ביולוגיה"
  }
];

export const students: Student[] = studentsRaw.map(Student.from);
