import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootLayoutProps } from "@/lib/types";
import Header from "@/components/main-layout/header";
import { ThemeProvider } from "@/components/main-layout/theme-provider";
import Footer from "@/components/main-layout/footer";
import { Toaster } from 'react-hot-toast';
import { getCurrentLocale, getStaticParams } from "@/locales/server";
import { I18nProviderClient } from "@/locales/client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title : {
    default : "Form in line",
    template : "Form in line | %s",
  },
  description: "Form in line is a virtual queue app that allows you to create and manage user queues for your online classes.",
};

/* export function generateStaticParams() {
  return getStaticParams()
}
 */
async function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang={await getCurrentLocale() || "es"} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProviderClient locale={await getCurrentLocale() || "es"}>
            <Header />
            <main className="p-2 md:p-4 grow flex-col flex">
              {children}
            </main>
            <Footer />
            <Toaster />
          </I18nProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;