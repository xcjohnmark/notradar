import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://notradar.com"),
  title: "Notradar | Your Edge on Bayse Markets",
  description: "Non-custodial copytrading platform built on top of Bayse Markets. Mirror top traders, manage risk, and trade with conviction.",
  openGraph: {
    title: "Notradar | Your Edge on Bayse Markets",
    description: "Mirror top traders, manage risk, and trade with conviction without giving up custody of your funds.",
    url: "https://notradar.com",
    siteName: "Notradar",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Notradar | Your Edge on Bayse Markets",
    description: "Mirror top traders, manage risk, and trade with conviction without giving up custody of your funds.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
