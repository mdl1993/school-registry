import { Student } from "../models/Student";
import { Teacher } from "../models/Teacher";

// Initial mocked students
export const initialStudents: Student[] = [
    new Student("Mario", "Rossi", 14, "3A"),
    new Student("Anna", "Bianchi", 15, "3B"),
];

// Initial mocked teachers
export const initialTeachers: Teacher[] = [
    new Teacher("Antonio", "Rossi", "Mathematics"),
];