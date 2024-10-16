import { useRouter } from "next/router";
import { Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import StudentForm from "@/components/StudentForm";
import { Student, StudentFormErrors } from "@/types/student";
import { useState } from "react";
import Container from "@/components/Container";

interface Props {
	student: Student;
}

const EditStudent = ({ student }: Props) => {
	const router = useRouter();
	const [studentFormErrors, setStudentFormErrors] =
		useState<StudentFormErrors>();

	const handleSubmit = async (studentData: Omit<Student, "id">) => {
		const res = await fetch(`/api/students/${student.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(studentData),
		});

		if (res.ok) {
			router.push(`/students/${student?.id}`);
		} else {
			const errorData = await res.json();
			if (errorData.errors) {
				setStudentFormErrors(errorData);
			}
		}
	};

	return (
		<Container className="mt-6">
			<Card>
				<CardHeader>
					<Heading size="md">Edit Student Details</Heading>
				</CardHeader>

				<CardBody>
					<StudentForm
						student={student}
						onSubmit={handleSubmit}
						studentErrors={studentFormErrors}
					/>
				</CardBody>
			</Card>
		</Container>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const { studentId } = context.params!;
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/students/${studentId}`
	);
	const student = await res.json();
	return { props: { student } };
};

export default EditStudent;
