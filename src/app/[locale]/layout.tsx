import type { Metadata } from "next";
import { Inter, Playfair } from "next/font/google";

import "../globals.css";
import { ThemeProvider } from "@/providers/theme.provider";
import { NavMenuView } from "@/views/nav-menu.view/nav-menu.view";
import { FooterView } from "@/views/footer.view/footer.view";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import PageToTop from "@/components/page-to-top";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair({
  weight: "900",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Henrique Teixeira Dev | Melhorzin",
  description:
    "Entregue de corpo e alma ao universo da tecnologia e desenvolvimento, dedicando horas e horas a aprimorar minhas habilidades e conhecimentos nessa área.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const routing = {
  locales: ["pt", "en"],
  defaultLocale: "pt-BR",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} ${playfair.variable} `}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex w-full min-h-screen flex-col">
              <NavMenuView />
              {children}
              <FooterView />
            </main>
          </ThemeProvider>
          <PageToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
