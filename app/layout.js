import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Analytics Dashboard",
  description: "Sales funnel analytics and data extraction tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-white text-slate-800 font-sans`}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
