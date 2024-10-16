"use client";

import {
	Card,
	CardHeader,
	CardBody,
	Box,
	Heading,
	Stack,
	StackDivider,
	Text,
	Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Student } from "@/types/student";
import Container from "@/components/Container";
import { GetServerSideProps } from "next";
import NextLink from "next/link";

interface Props {
	student: Student;
}

const StudentDetails = ({ student }: Props) => {
	const router = useRouter();

	const handleDelete = async () => {
		const res = await fetch(`/api/students/${student.id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			router.push("/students");
		}
	};

	return (
		<Container className="mt-6">
			<div className="flex justify-end mb-5 space-x-4">
				<Button as={NextLink} href={`/students/${student.id}/edit`}>
					Edit
				</Button>
				<Button colorScheme="red" onClick={handleDelete}>
					Delete
				</Button>
			</div>

			<Card>
				<CardHeader>
					<Heading size="md">Student Details</Heading>
				</CardHeader>

				<CardBody>
					<Stack divider={<StackDivider />} spacing="4">
						<Box>
							<Heading size="xs" textTransform="uppercase">
								Name
							</Heading>
							<Text pt="2" fontSize="sm">
								{student.name}
							</Text>
						</Box>
						<Box>
							<Heading size="xs" textTransform="uppercase">
								Registration Number
							</Heading>
							<Text pt="2" fontSize="sm">
								{student.registrationNumber}
							</Text>
						</Box>
						<Box>
							<Heading size="xs" textTransform="uppercase">
								Major
							</Heading>
							<Text pt="2" fontSize="sm">
								{student.major}
							</Text>
						</Box>
						<Box>
							<Heading size="xs" textTransform="uppercase">
								GPA
							</Heading>
							<Text pt="2" fontSize="sm">
								{student.gpa}
							</Text>
						</Box>
						<Box>
							<Heading size="xs" textTransform="uppercase">
								Date of Birth
							</Heading>
							<Text pt="2" fontSize="sm">
								{student.dob}
							</Text>
						</Box>
					</Stack>
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

export default StudentDetails;
