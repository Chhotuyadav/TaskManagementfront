"use client";
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FrontHead from "./components/FrontHead";
import FrontHeader from "./components/FrontHeader";
import FrontFooter from "./components/FrontFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});





export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    const role = Cookies.get("role");
    // If no token, redirect to the login page
    if (token && role == "user") {
      router.push("/user/dashboard");
    } else if (token && role == "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  }, [router]);
  return (
    <html lang="en">
      <FrontHead />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FrontHeader />
        {children}
        {/* <FrontFooter /> */}
      </body>
    </html>
  );
}
