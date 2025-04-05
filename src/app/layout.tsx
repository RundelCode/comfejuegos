import type { Metadata } from "next";
import { Baloo_2} from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-Baloo_2",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Comfejuegos",
  description: "Una app de juegos para niños creada por estudiantes de comfenalco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${baloo.variable}`}>
        {children}
      </body>
    </html>
  );
}
