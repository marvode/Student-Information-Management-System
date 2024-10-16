import { ReactNode } from "react";

const Container = ({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div className={"max-w-[1280px] mx-auto px-6 " + className}>
			{children}
		</div>
	);
};

export default Container;
