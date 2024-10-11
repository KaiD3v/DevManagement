import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import { AuthProvider } from "../providers/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Management - Seu Sistema de Gerenciamento",
  description: "Gerencie facilmente seus clientes e atendimentos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
