import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { ReactNode } from "react";
import { Providers } from "./hooks/queryClient";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify"; // ✅ import toast container
import "react-toastify/dist/ReactToastify.css"; // ✅ import toastify css

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "FarmNet",
  description:
    "Farmnet is where buyers connect with vendors on farm produce and food stuffs",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Providers>
          {/* ✅ Toast container must be at root so all pages can trigger toasts */}
          <ToastContainer position="top-right" autoClose={3000} />
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}