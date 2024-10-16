"use client";

import localFont from "next/font/local";
import { Link } from "@chakra-ui/react";

const interSans = localFont({
	src: "./fonts/InterVariable.woff2",
	variable: "--font-inter-sans",
	weight: "100 900",
});

export default function Home() {
	return (
		<Link className="text-xl" href="/students">
			View all students
		</Link>
	);
}
