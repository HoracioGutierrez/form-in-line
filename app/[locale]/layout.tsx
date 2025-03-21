import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootLayoutProps } from "@/lib/types";
import Header from "@/components/main-layout/header";
import { ThemeProvider } from "@/components/main-layout/theme-provider";
import Footer from "@/components/main-layout/footer";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import { NextIntlClientProvider, Locale, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Form in line",
    template: "Form in line | %s",
  },
  description: "Form in line is a virtual queue app that allows you to create and manage user queues for your online classes.",
};


async function RootLayout({ children, params }: RootLayoutProps) {

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <NextIntlClientProvider locale={locale}>
              <Header />
              <main className="p-2 md:p-4 grow flex-col flex">
                {children}
              </main>
              <Footer />
              <Toaster />
              {/* <Tooltip id="tooltip"/> */}
            </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;