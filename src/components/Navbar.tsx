import { Dispatch, MouseEvent, SetStateAction } from "react";

const Navbar = ({
	sidebarOpen,
	setSidebarOpen,
}: {
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="-mb-px flex h-16 items-center justify-between">
					<div className="flex">
						<button
							className="text-gray-500 hover:text-gray-600 sm:hidden"
							aria-controls="sidebar"
							aria-expanded={sidebarOpen}
							onClick={handleClick}
						>
							<span className="sr-only">Open sidebar</span>
							<svg
								className="h-6 w-6 fill-current"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect x="4" y="5" width="16" height="2" />
								<rect x="4" y="11" width="16" height="2" />
								<rect x="4" y="17" width="16" height="2" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
