
import "./globals.css";
// import { ThemeProvider } from "./themeProviders/ThemeProvider";
import { AuthProvider } from "@/provider/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { CartProvider } from "@/provider/CartProvider";

export const metadata: Metadata = {
  title: "Foodie Haven",
  description: "Discover and share delicious recipes from around the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      {/* className="dark" */}
      <body className="min-h-screen bg-background text-foreground mx-auto w-11/12">
       
        {/* <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem> */}
          <AuthProvider>
          <CartProvider>
              <Navbar />
            {children}
             <Toaster richColors />
          </CartProvider>
          </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
