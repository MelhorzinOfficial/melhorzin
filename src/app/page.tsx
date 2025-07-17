import {
	Briefcase,
	Github,
	Linkedin,
	Mail,
	PhoneCall,
	User,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SpaceBackground } from "@/components/background/space-background";
import { ContactForm } from "@/components/form/contact-form";
import { GithubProjects } from "@/components/github/github-projects";
import { HeroSection } from "@/components/section/hero-section";
import { SkillsSection } from "@/components/section/skills-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
	const t = useTranslations("HomePage");
	const projectsT = useTranslations("ProjectsSection");

	return (
		<main className="relative min-h-screen overflow-hidden bg-black text-white">
			<SpaceBackground />

			<div className="container relative z-10 mx-auto px-4 py-16">
				<HeroSection />

				<section id="about" className="my-20 scroll-mt-20">
					<div className="mb-10 flex items-center">
						<div className="relative mr-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 shadow-lg shadow-purple-900/20">
							<User className="h-7 w-7 text-white" />
							<div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-purple-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
						</div>
						<div>
							<span className="block text-sm font-medium uppercase tracking-wider text-purple-400">
								01
							</span>
							<h2 className="text-3xl font-bold tracking-tight text-white">
								{t("aboutSection.heading")}
							</h2>
						</div>
						<div className="ml-auto h-px flex-grow bg-gradient-to-r from-purple-800 to-transparent"></div>
					</div>

					<Card className="border-purple-800/30 bg-black/40 p-6 backdrop-blur-md">
						<p className="mb-4 text-lg text-gray-300">
							{t("aboutSection.description1")}
						</p>
						<div className="mt-6">
							<Button
								variant="outline"
								className="border-purple-500 text-white hover:bg-purple-900/20"
								asChild
							>
								<a
									href="/Raposo_Curriculo.pdf"
									target="_blank"
									rel="noopener noreferrer"
								>
									Visualizar Currículo
								</a>
							</Button>
						</div>
					</Card>
				</section>

				<section id="projects" className="my-20 scroll-mt-20">
					<div className="mb-10 flex items-center">
						<div className="relative mr-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 shadow-lg shadow-blue-900/20">
							<Briefcase className="h-7 w-7 text-white" />
							<div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-blue-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
						</div>
						<div>
							<span className="block text-sm font-medium uppercase tracking-wider text-blue-400">
								02
							</span>
							<h2 className="text-3xl font-bold tracking-tight text-white">
								{t("projectsSection.heading")}
							</h2>
						</div>
						<div className="ml-auto h-px flex-grow bg-gradient-to-r from-blue-800 to-transparent"></div>
					</div>

					<GithubProjects username="raposoG" limit={6} />

					<div className="mt-8 flex justify-center">
						<Button
							variant="outline"
							size="lg"
							className="border-blue-500 bg-blue-900/20 px-6 text-blue-300 hover:bg-blue-900/40 hover:text-blue-100"
							asChild
						>
							<Link
								href="https://github.com/raposoG?tab=repositories"
								target="_blank"
							>
								<Github className="mr-2 h-5 w-5" />
								{projectsT("viewAllExternal")}
							</Link>
						</Button>
					</div>
				</section>

				<SkillsSection />

				<section id="contact" className="my-20 scroll-mt-20">
					<div className="mb-10 flex items-center">
						<div className="relative mr-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-green-600 to-green-900 shadow-lg shadow-green-900/20">
							<PhoneCall className="h-7 w-7 text-white" />
							<div className="absolute inset-0 bg-gradient-to-br from-green-600/40 to-green-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
						</div>
						<div>
							<span className="block text-sm font-medium uppercase tracking-wider text-green-400">
								04
							</span>
							<h2 className="text-3xl font-bold tracking-tight text-white">
								{t("contactSection.heading")}
							</h2>
						</div>
						<div className="ml-auto h-px flex-grow bg-gradient-to-r from-green-800 to-transparent"></div>
					</div>

					<Card className="border-green-800/30 bg-black/40 p-6 backdrop-blur-md">
						<div className="grid gap-10 md:grid-cols-2">
							<div>
								<h3 className="mb-4 text-xl font-semibold text-green-300">
									{t("contactSection.subheading")}
								</h3>
								<p className="mb-6 text-gray-300">
									{t("contactSection.description")}
								</p>
								<div className="space-y-4">
									<div className="flex items-center">
										<Mail className="mr-3 h-5 w-5 text-green-400" />
										<span>gabriel.henrique7@hotmail.com</span>
									</div>
									<div className="flex items-center">
										<Github className="mr-3 h-5 w-5 text-green-400" />
										<Link
											href="https://github.com/raposoG"
											target="_blank"
											className="hover:text-green-300"
										>
											github.com/raposoG
										</Link>
									</div>
									<div className="flex items-center">
										<Linkedin className="mr-3 h-5 w-5 text-green-400" />
										<Link
											href="https://www.linkedin.com/in/gabrielraposoin/"
											target="_blank"
											className="hover:text-green-300"
										>
											linkedin.com/in/gabrielraposoin
										</Link>
									</div>
								</div>
							</div>
							<ContactForm />
						</div>
					</Card>
				</section>
			</div>

			<footer className="relative z-10 border-t border-gray-800 bg-black/60 py-8 backdrop-blur-md">
				<div className="container mx-auto px-4 text-center text-gray-400">
					<p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
					<div className="mt-4 flex justify-center space-x-4">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-gray-400 hover:text-white"
							asChild
						>
							<Link
								href="https://github.com/raposoG"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github className="h-5 w-5" />
							</Link>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-gray-400 hover:text-white"
						>
							<Linkedin className="h-5 w-5" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-gray-400 hover:text-white"
						>
							<Mail className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</footer>
		</main>
	);
}
