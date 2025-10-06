import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/lib/cart-context"; // client component

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Voltspire - Powering Your World with Gizzu",
  description:
    "Voltspire is your trusted destination for Gizzu products, offering reliable power solutions, energy backups, and smart accessories designed to keep you connected, productive, and powered anytime, anywhere.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* CartProvider is a client component */}
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
