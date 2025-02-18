import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getUser } from "./lib/auth";
import { getAllOrganisasi } from "./lib/organisasi";
import { ToastContainer } from "react-toastify";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BEM UNAI",
  description: "Badan Eksekutif Mahasiswa Universitas Advent Indonesia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const dataBem = await getAllOrganisasi();

  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-MLCPHH9P" />
      <body
        className={`${inter.className} antialiased bg-primary text-white`} // Apply Inter font
      >
        <Navbar user={user} dataBem={dataBem} />
        {children}
        <ToastContainer />
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-12Q5YEBG60" />
    </html>
  );
}
