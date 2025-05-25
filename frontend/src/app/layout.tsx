import type { Metadata } from "next";
import "./(deffault)/globals.scss";
import Header from "@/widgets/Header/ui";

export const metadata: Metadata = {
	title: "Story Craft",
	description: "The project in which you can create your own story!",
};

type Props = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
