"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	SearchIcon,
} from "@chakra-ui/icons";
import {
	Button,
	InputGroup,
	Input,
	InputLeftElement,
	Link,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import { Ellipsis } from "lucide-react";

import { Student } from "@/types/student";
import Container from "@/components/Container";

interface Props {
	initialStudents: Student[];
}

const Students = ({ initialStudents }: Props) => {
	const router = useRouter();
	const [students, setStudents] = useState(initialStudents);

	const handleDelete = async (studentId: string) => {
		const res = await fetch(`/api/students/${studentId}`, {
			method: "DELETE",
		});
		if (res.ok) {
			router.push("/students");
		}
	};

	const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
		const debouncedSearch = debounce(handleSearch, 500);
		debouncedSearch(e);

		const searchValue = e.target.value;
		if (searchValue === "") {
			setStudents(initialStudents);
			return;
		}

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/students?search=${searchValue}`
		);
		const students = await res.json();
		setStudents(students);
	};

	return (
		<Container>
			<div className="flex mb-6 mt-12 justify-between item-center">
				<InputGroup width="lg">
					<InputLeftElement pointerEvents="none">
						<SearchIcon color="gray.300" />
					</InputLeftElement>
					<Input
						onChange={handleSearch}
						className="bg-white"
						type="text"
						placeholder="Search for a student by name, major or GPA"
					/>
				</InputGroup>

				<Button href="/students/new" as={NextLink} colorScheme="blue">
					Add Student
				</Button>
			</div>

			<div className="bg-white border rounded">
				<TableContainer>
					<Table variant="striped">
						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Registration Number</Th>
								<Th>Major</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							{students.map(student => (
								<Tr key={student.id}>
									<Td>{student.name}</Td>
									<Td>{student.registrationNumber}</Td>
									<Td>{student.major}</Td>
									<Td>
										<Menu>
											<MenuButton
												as={Button}
												variant="ghost"
												size="sm"
											>
												<Ellipsis />
											</MenuButton>
											<MenuList>
												<MenuItem
													onClick={() =>
														router.push(
															`/students/${student.id}`
														)
													}
												>
													View Details
												</MenuItem>
												<MenuItem
													onClick={() =>
														router.push(
															`/students/${student.id}/edit`
														)
													}
												>
													Edit
												</MenuItem>
												<MenuItem
													color="red.500"
													fontWeight="medium"
													_hover={{ bg: "red.100" }}
													onClick={() =>
														handleDelete(student.id)
													}
												>
													Delete
												</MenuItem>
											</MenuList>
										</Menu>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>

					<div className="flex justify-end py-3 space-x-5 px-5">
						<Button
							as={NextLink}
							href="#"
							variant="ghost"
							leftIcon={<ChevronLeftIcon />}
						>
							Prev
						</Button>

						<Button
							as={NextLink}
							href="#"
							variant="ghost"
							rightIcon={<ChevronRightIcon />}
						>
							Next
						</Button>
					</div>
				</TableContainer>
			</div>
		</Container>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students`);
	const initialStudents = await res.json();
	return { props: { initialStudents } };
};

function debounce(func: Function, delay: number): any {
	let timeoutId: NodeJS.Timeout;
	return (...args: any[]) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
}

export default Students;
