import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	title: string;
	isOpen: boolean;
	onClose: () => void;
}

const CustomModal = ({ isOpen, onClose, children, title = "" }: Props) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{children}</ModalBody>

				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CustomModal;
