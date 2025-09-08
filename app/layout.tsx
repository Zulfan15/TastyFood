import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "FoodShare Platform - Reducing Food Waste Together",
  description:
    "Connect food donors with receivers in your community. Share excess food, reduce waste, and help those in need within a 5km radius.",
  icons: {
    icon: "/foodshare-icon.svg",
    apple: "/foodshare-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
