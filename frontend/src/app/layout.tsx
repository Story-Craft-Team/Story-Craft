import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./(deffault)/globals.scss";
import { Header } from "@/widgets";
import { ThemeChanger } from "@/features";


const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"], // Все размеры
  display: "swap",
});

export const metadata: Metadata = {
	title: "Story Craft",
	description: "The project in which you can create your own story!",
};

type Props = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" className={nunito.className}>
			<body suppressHydrationWarning>
				<ThemeChanger> 
					<Header />
					{children}
				</ThemeChanger>
			</body>
		</html>
	);
}
