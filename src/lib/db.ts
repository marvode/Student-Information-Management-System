import { Student } from '@/types/student';

let students: Student[] = [
    {
        id: '1',
        name: 'John Doe',
        major: 'Computer Science',
        gpa: 3.5,
        dob: '1999-01-01',
        registrationNumber: '123456',
    },
    {
        id: '2',
        name: 'Jane Doe',
        major: 'Information Technology',
        gpa: 3.8,
        dob: '1998-02-02',
        registrationNumber: '654321',
    },
    {
        id: '3',
        name: 'Alice',
        major: 'Computer Science',
        gpa: 3.9,
        dob: '1997-03-03',
        registrationNumber: '987654',
    },
    {
        id: '4',
        name: 'Bob',
        major: 'Information Technology',
        gpa: 3.7,
        dob: '1996-04-04',
        registrationNumber: '456789',
    },
    {
        id: '5',
        name: 'Charlie',
        major: 'Computer Science',
        gpa: 3.6,
        dob: '1995-05-05',
        registrationNumber: '321654',
    }
];

export const getAllStudents = (search = ""): Student[] => {
    if (search !== "") {
        search = search.trim().toLowerCase();
        // search students by name, major or registration number
        return students.filter(student => {
            return student.name.toLowerCase().includes(search) ||
                student.major.toLowerCase().includes(search) ||
                student.registrationNumber.toLowerCase().includes(search);
        });
    }
    return students;
};

export const getStudentById = (id: string): Student | undefined => {
    return students.find(student => student.id === id);
};

export const addStudent = (student: Omit<Student, 'id'>): Student => {
    const newStudent = { ...student, id: Date.now().toString() };
    students.push(newStudent);
    return newStudent;
};

export const updateStudent = (id: string, updatedStudent: Partial<Student>): Student | null => {
    const index = students.findIndex(student => student.id === id);
    if (index !== -1) {
        students[index] = { ...students[index], ...updatedStudent };
        return students[index];
    }
    return null;
};

export const deleteStudent = (id: string): boolean => {
    const initialLength = students.length;
    students = students.filter(student => student.id !== id);
    return students.length < initialLength;
};