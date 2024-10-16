export interface Student {
    id: string;
    name: string;
    registrationNumber: string;
    major: string;
    dob: string;
    gpa: number;
}

export interface StudentFormErrors {
    errors: Partial<Record<keyof Student, string>>
}