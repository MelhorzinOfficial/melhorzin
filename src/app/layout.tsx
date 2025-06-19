import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Melhorzin | Universo de Portfólios",
  description: "Explore um universo interativo 3D de portfólios de desenvolvedores. Cada planeta representa um desenvolvedor único, com seus projetos e habilidades.",
  keywords: ["portfólio", "desenvolvedores", "3D", "interativo", "React", "Three.js", "Next.js"],
  authors: [
    {
      name: "Melhorzin Team",
      url: "https://github.com/RaposoG/melhorzin",
    },
  ],
  creator: "Melhorzin Team",
  publisher: "Melhorzin",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://melhorzin.com",
    title: "Melhorzin | Universo de Portfólios",
    description: "Explore um universo interativo 3D de portfólios de desenvolvedores. Cada planeta representa um desenvolvedor único, com seus projetos e habilidades.",
    siteName: "Melhorzin",
    images: [
      {
        url: "https://melhorzin.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Melhorzin Universe Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melhorzin | Universo de Portfólios",
    description: "Explore um universo interativo 3D de portfólios de desenvolvedores. Cada planeta representa um desenvolvedor único, com seus projetos e habilidades.",
    images: ["https://melhorzin.com/og-image.jpg"],
    creator: "@melhorzin",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
