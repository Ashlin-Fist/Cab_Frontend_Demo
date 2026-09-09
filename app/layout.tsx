import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CabGo — Smart Cab Booking",
  description: "Cab booking frontend prototype"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}