import React, {
	useState,
	useEffect,
	useRef,
	Dispatch,
	SetStateAction,
} from "react";
import { Link } from "@chakra-ui/next-js";

function Sidebar({
	sidebarOpen,
	setSidebarOpen,
}: {
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const sidebar = useRef<HTMLDivElement>(null);
	const trigger = useRef<HTMLButtonElement>(null);

	const [sidebarExpanded, setSidebarExpanded] = useState(false);

	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return;
			if (
				!sidebarOpen ||
				sidebar.current.contains(target as Node) ||
				trigger.current.contains(target as Node)
			)
				return;
			setSidebarOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	}, [sidebarOpen, setSidebarOpen]);

	return (
		<div>
			<div
				className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30 transition-opacity duration-200 lg:z-auto lg:hidden ${
					sidebarOpen
						? "opacity-100"
						: "pointer-events-none opacity-0"
				}`}
				aria-hidden="true"
			></div>

			<div
				id="sidebar"
				ref={sidebar}
				className={`absolute bg-white left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col transition-all duration-200 ease-in-out sm:static sm:left-auto sm:top-auto p-0 sm:translate-x-0 sm:overflow-y-auto sm:!w-64 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-64"
				}`}
			>
				<div className="flex justify-between py-3 pl-5 mb-10 bg-white sm:px-2">
					<button
						ref={trigger}
						className="text-gray-500 hover:text-gray-400 sm:hidden"
						onClick={() => setSidebarOpen(!sidebarOpen)}
						aria-controls="sidebar"
						aria-expanded={sidebarOpen}
					>
						<span className="sr-only">Close sidebar</span>
						<svg
							className="w-6 h-6 fill-current"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
						</svg>
					</button>
					{/* Logo */}
					<Link href="/students" className="block">
						{/* <img
							className="h-10"
							src="/images/default1.png"
							alt=""
						/> */}
					</Link>
				</div>

				<div className="p-4 space-y-8">
					<div>
						<ul className="mt-3">
							<li
								className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0`}
							>
								<Link
									href="/students"
									className={`block truncate text-gray-200 transition duration-150}`}
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center grow">
											<svg
												className="w-6 h-6 shrink-0"
												viewBox="0 0 24 24"
											>
												<path
													className={`fill-current `}
													d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
												/>
												<path
													className={`fill-current `}
													d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
												/>
												<path
													className={`fill-current`}
													d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
												/>
											</svg>
											<span className="ml-3 text-sm font-medium duration-200">
												Dashboard
											</span>
										</div>
									</div>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="hidden pt-3 mt-auto justify- lg:inline-flex 2xl:hidden">
					<div className="px-3 py-2">
						<button
							onClick={() => setSidebarExpanded(!sidebarExpanded)}
						>
							<span className="sr-only">
								Expand / collapse sidebar
							</span>
							<svg
								className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
								viewBox="0 0 24 24"
							>
								<path
									className="text-gray-400"
									d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
								/>
								<path
									className="text-gray-600"
									d="M3 23H1V1h2z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
