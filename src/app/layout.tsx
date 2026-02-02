// app/layout.tsx
import "./globals.css";
// import { ThemeProvider } from "./themeProviders/ThemeProvider";
import { AuthProvider } from "@/provider/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
import { Toaster } from "sonner";

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
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground mx-auto w-11/12">
       
        {/* <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem> */}
          <AuthProvider>
            <Navbar />
            {children}
             <Toaster richColors />
          </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
