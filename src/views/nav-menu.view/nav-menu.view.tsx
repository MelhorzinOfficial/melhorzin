import { NavMenu } from "@/components/nav-menu/nav-menu";
// import { TopBanner } from "@/components/top-banner/top-banner";
import { useTranslations } from "next-intl";

export function NavMenuView() {
  const t = useTranslations("alert");

  return (
    <nav className="w-full sticky top-0 z-50">
      {/* <TopBanner text={t("title")} url="/" target="_self" /> */}
      <NavMenu />
    </nav>
  );
}
