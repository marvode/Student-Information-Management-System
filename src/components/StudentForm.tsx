import { ChangeEvent, FormEvent, useState } from "react";
import {
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Input,
} from "@chakra-ui/react";

import { Student, StudentFormErrors } from "@/types/student";

interface Props {
	student?: Student;
	onSubmit: (student: Omit<Student, "id">) => Promise<void>;
	studentErrors?: StudentFormErrors;
}

const StudentForm = ({ student, onSubmit, studentErrors }: Props) => {
	const [formData, setFormData] = useState({
		name: student?.name || "",
		registrationNumber: student?.registrationNumber || "",
		major: student?.major || "",
		dob: student?.dob || "",
		gpa: student?.gpa || 0,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await onSubmit(formData);
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			<FormControl isInvalid={!!studentErrors?.errors?.major}>
				<FormLabel>Student Name</FormLabel>
				<Input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				{studentErrors?.errors?.name && (
					<FormErrorMessage>
						{studentErrors?.errors?.name}
					</FormErrorMessage>
				)}
			</FormControl>

			<FormControl
				isInvalid={!!studentErrors?.errors?.registrationNumber}
			>
				<FormLabel htmlFor="registrationNumber">
					Registration Number
				</FormLabel>
				<Input
					type="text"
					id="registrationNumber"
					name="registrationNumber"
					value={formData.registrationNumber}
					onChange={handleChange}
				/>
				{studentErrors?.errors?.registrationNumber && (
					<FormErrorMessage>
						{studentErrors?.errors.registrationNumber}
					</FormErrorMessage>
				)}
			</FormControl>

			<FormControl isInvalid={!!studentErrors?.errors?.major}>
				<FormLabel htmlFor="major">Major</FormLabel>
				<Input
					type="text"
					id="major"
					name="major"
					value={formData.major}
					onChange={handleChange}
				/>
				{studentErrors?.errors?.major && (
					<FormErrorMessage>
						{studentErrors?.errors.major}
					</FormErrorMessage>
				)}
			</FormControl>

			<FormControl isInvalid={!!studentErrors?.errors?.dob}>
				<FormLabel htmlFor="dob">Date of Birth</FormLabel>
				<Input
					id="dob"
					name="dob"
					value={formData.dob}
					onChange={handleChange}
				/>
				{studentErrors?.errors?.dob && (
					<FormErrorMessage>
						{studentErrors?.errors.dob}
					</FormErrorMessage>
				)}
			</FormControl>

			<FormControl isInvalid={!!studentErrors?.errors?.gpa}>
				<FormLabel htmlFor="gpa">GPA</FormLabel>
				<NumberInput
					id="gpa"
					name="gpa"
					min={0}
					step={0.01}
					max={5}
					defaultValue={formData.gpa}
					onChange={e => setFormData({ ...formData, gpa: +e })}
					allowMouseWheel
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
				{studentErrors?.errors?.gpa && (
					<FormErrorMessage>
						{studentErrors?.errors.gpa}
					</FormErrorMessage>
				)}
			</FormControl>

			<div className="mt-4 flex justify-end">
				<Button colorScheme="blue" type="submit">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default StudentForm;
