import type { Metadata } from "next";
import "./globals.css";
import RevealObserver from "@/components/RevealObserver";

export const metadata: Metadata = {
  title: "Proud — Stay focused on your Mac with Dynamic Island",
  description: "Proud brings the Dynamic Island to your Mac, so you stay focused on what you are doing.",
  icons: {
    icon: "/proud-favicon-32.png",
    apple: "/proud-icon-180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f4f4f6] text-[#1c1c1e] antialiased" style={{ fontFamily: "Inter, sans-serif" }}>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}"}</style>
        </noscript>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
