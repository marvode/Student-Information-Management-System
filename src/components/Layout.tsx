import { ReactNode, useState } from "react";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden bg-gray-50 text-gray-600 ">
			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>

			<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
				<Navbar
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				/>
				<main>
					<Container className="mt-6">{children}</Container>
				</main>
			</div>
		</div>
	);
}
