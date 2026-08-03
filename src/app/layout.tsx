import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yupii - Experiencias únicas para regalar",
  description:
    "Yupii - Experiencias únicas para regalar. Regalos de gastronomía, aventura, bienestar o estadías en República Dominicana.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-DO">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
