import { NextApiRequest, NextApiResponse } from 'next';

import { getAllStudents, addStudent } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { search } = req.query;
        console.log(req.query);

        const students = getAllStudents(search as string);
        res.status(200).json(students);
    } else if (req.method === 'POST') {
        const newStudent = addStudent(req.body);
        res.status(201).json(newStudent);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}