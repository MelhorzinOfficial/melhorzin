"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Button } from "../ui/button";
import { NavMenuLogo } from "./nav-menu-logo";
import { NavMenuNavLink } from "./nav-menu-nav-link";
import { useTranslations } from "next-intl";
import { ArrowTopRightSvg } from "@/svgs/arrow-top-right.svg";

export function NavMenu() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const t = useTranslations("nav-menu");

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      const progress = (currentScroll / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full py-6 bg-zinc-900 relative">
      <div className="flex items-center content-box justify-between px-4">
        <NavMenuLogo />
        <NavMenuNavLink />
        <Button asChild>
          <Link
            href={`https://api.whatsapp.com/send?phone=5582987389360&text=Ol%C3%A1%2C+gostaria+de+entrar+em+contato+com+voc%C3%AA`}
            target="_blank"
          >
            {t("contact")}
            <ArrowTopRightSvg className="ml-2" pathColor="black" size={12} />
          </Link>
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}
