import { useRouter } from "next/router";
import { Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";

import StudentForm from "@/components/StudentForm";
import { Student, StudentFormErrors } from "@/types/student";
import { useState } from "react";
import Container from "@/components/Container";

const NewStudent = () => {
	const router = useRouter();
	const [studentFormErrors, setStudentFormErrors] =
		useState<StudentFormErrors>();

	const handleSubmit = async (studentData: Omit<Student, "id">) => {
		const res = await fetch(`/api/students`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(studentData),
		});

		if (res.ok) {
			const student = await res.json();
			router.push(`/students/${student.id}`);
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
						onSubmit={handleSubmit}
						studentErrors={studentFormErrors}
					/>
				</CardBody>
			</Card>
		</Container>
	);
};

export default NewStudent;
