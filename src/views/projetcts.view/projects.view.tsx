import { AvatarWithInfo } from "@/components/partials/avatar-with-info/avatar-with-info";
import theme from "@/lib/tw-resolve-colors";
import { ArrowTopRightSvg } from "@/svgs/arrow-top-right.svg";
import Link from "next/link";

const data = [
  {
    id: 1,
    title: "Cartão Digital Plus Saúde",
    description:
      "O tradicional cartão de desconto que facilitava consultas, exames e procedimentos agora está totalmente digital, trazendo mais praticidade e acessibilidade para você. Com a tecnologia ao seu lado, cuidar da saúde ficou ainda mais simples e vantajoso!",
    url: "https://play.google.com/store/apps/details?id=com.plussaude.plussaude",
  },
  {
    id: 2,
    title: "Mútua Assessoria",
    description:
      "Nesse projeto, eu fui responsável pelo desenvolvimento do site institucional da empresa. Atuei no desenvolvimento de soluções de programação, incluindo front-end, back-end e UI/UX design, desde 2021.",
    url: "https://mutuaassessoria.com.br/",
  },
  {
    id: 3,
    title: "Plus Saúde",
    description:
      "Desenvolvi o site da Plus Saúde, uma empresa que oferece um cartão digital de descontos em consultas, exames, tratamentos e terapias, com foco em promover uma saúde preventiva e de qualidade de vida. Com a tecnologia ao seu lado, cuidar da saúde ficou ainda mais simples e vantajoso!",
    url: "https://www.plus-saude.com/",
  },
];

export function ProjectsView() {
  return (
    <section className="w-full py-28 bg-zinc-900" id="projects">
      <div className="flex w-full flex-col content-box gap-24 h-full">
        <div className="flex items-center w-full gap-10 px-4">
          <AvatarWithInfo>
            <AvatarWithInfo.Avatar
              avatarImage="https://github.com/henriqueteixeiradev.png"
              size={150}
            />
          </AvatarWithInfo>

          <div className="flex flex-col gap-5">
            <span className="p-3 bg-zinc-700 w-fit rounded-md">
              A vida deve ser um crescimento e aprendizado constantes!
            </span>
            <h2 className="font-semibold text-5xl">Projects</h2>
          </div>
        </div>

        <div className="grid items-center w-full grid-cols-3 border h-full gap-5 p-5 bg-background rounded-xl">
          {data.map((item) => (
            <div
              className="flex flex-col flex-[45%] col-span-1 bg-zinc-900/60 p-10 rounded-xl border h-full"
              key={item.id}
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <Link
                    href={item.url}
                    target="_blank"
                    className="flex justify-center items-center bg-primary p-4 rounded-full hover:brightness-110 transition-all"
                  >
                    <ArrowTopRightSvg pathColor={theme.colors.black} />
                  </Link>
                </div>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
