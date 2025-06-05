import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./(default)/styles/globals.scss";
import ClientProvider from "./(default)/ClientProvider";
import { ThemeChanger } from "@/features";
import { Header } from "@/widgets";

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/2.png",
  },
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
        <ClientProvider>
          <ThemeChanger>
            <Header />
            <main className="main">{children}</main>
          </ThemeChanger>
        </ClientProvider>
      </body>
    </html>
  );
}