import { HeaderHeadLine } from "./header-headline";
import { HeaderCardWrapper } from "./header.cards-wrapper";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowTopRightSvg } from "@/svgs/arrow-top-right.svg";
import { TECHNOLOGIES } from "@/mocks/technologies";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("header.right");

  return (
    <section className="flex w-full">
      <div className="flex flex-col w-[55%] items-end gap-28 mt-36">
        <HeaderHeadLine />
        <HeaderCardWrapper />
      </div>

      <div className="border flex w-[45%] pb-20 pl-20 flex-col justify-end gap-7 bg-[url('/img/cover.jpeg')] bg-cover bg-no-repeat bg-top relative">
        <div className="flex flex-col gap-3" id="technology">
          <h2 className="font-semibold text-2xl bg-black/30 w-fit px-2 backdrop-blur-sm">
            {t("title")}
          </h2>

          <p className="text-foreground text-base drop-shadow-md bg-black/30 px-2 w-fit backdrop-blur-sm">
            {t("description")}
          </p>
        </div>

        <div>
          <ul className="inline-flex border-[1px] border-zinc-800 rounded-full p-2">
            {TECHNOLOGIES.map((link) => (
              <li key={link.id} className="-ml-4 first:ml-0">
                <Link
                  href={link.url}
                  className="relative border-[2px]  border-zinc-600 overflow-hidden w-[62px] h-[62px] rounded-full  flex justify-center items-center appearance-none transition-all duration-300 hover:z-50"
                  target={link.target}
                >
                  <Image
                    src={link.image}
                    alt="arrow-right"
                    fill
                    className="object-cover rounded-full"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Button
          variant={"outline"}
          asChild
          className="w-fit rounded-xl"
          size={"lg"}
        >
          <Link href="#projects" className="text-muted-foreground">
            {t("button")}
            <ArrowTopRightSvg className="ml-3 rotate-90" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
