"use client";

import { Link } from "@chakra-ui/react";

export default function Home() {
	return (
		<Link className="text-xl" href="/students">
			View all students
		</Link>
	);
}
