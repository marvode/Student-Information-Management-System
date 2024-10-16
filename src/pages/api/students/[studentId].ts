import { getStudentById, updateStudent, deleteStudent } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(_req: Request, { params }: { params: { studentId: string } }) {
    const student = getStudentById(params.studentId);

    if (student) {
        return Response.json({ student });
    } else {
        return new Response(null, { status: 404 });
    }
}

export async function PUT(req: Request, { params }: { params: { studentId: string } }) {
    const body = await req.json();
    const updatedStudent = updateStudent(params.studentId, body);

    if (updatedStudent) {
        return Response.json({ student: updatedStudent });
    } else {
        return new Response(null, { status: 400 });
    }
}

export async function DELETE(_req: Request, { params }: { params: { studentId: string } }) {
    const deleted = deleteStudent(params.studentId);

    if (deleted) {
        return Response.json({ message: 'Student deleted' });
    } else {
        return new Response(null, { status: 400 });
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { studentId } = req.query;

    if (typeof studentId !== 'string') {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    if (req.method === 'GET') {
        const student = getStudentById(studentId);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } else if (req.method === 'PUT') {
        const updatedStudent = updateStudent(studentId, req.body);
        if (updatedStudent) {
            res.status(200).json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } else if (req.method === 'DELETE') {
        const deleted = deleteStudent(studentId);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}