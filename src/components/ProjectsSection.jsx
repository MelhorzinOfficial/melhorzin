import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Hogwarts",
    description:
      "A beautiful lading page about Hogwarts using React and Tailwind.",
    Image: "/Projects/Project1.png",
    tags: ["React", "TailwindCSS", "Next"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Carepulse",
    description: "Medical appointment platform.",
    Image: "/Projects/Project2.png",
    tags: ["React", "TailwindCSS", "Next.js"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Travel with Maki",
    description: "A beautiful lading page about Travel.",
    Image: "/Projects/Project3.png",
    tags: ["React", "TailwindCSS", "Next.js"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Store It",
    description:
      "Store It is a cloud-based file storage application similar to Google Drive..",
    Image: "/Projects/Project4.png",
    tags: ["React", "TailwindCSS", "Next.js"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Brainwave",
    description: "Explore the Possibilites of  AI  Chatting with Brainwave",
    Image: "/Projects/Project5.png",
    tags: ["React", "TailwindCSS", "Next.js"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Anime",
    description: "A safe place to watching your favorites animes",
    Image: "/Projects/Project6.png",
    tags: ["React", "TailwindCSS", "Next.js"],
    demoUrl: "#",
    githubUrl: "#",
  },
];
export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((projects, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={projects.Image}
                  alt={projects.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />{" "}
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-primary/20 text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>{" "}
                <h3 className="text-xl font-semibold mb-1">{projects.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {projects.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={projects.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={projects.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/renatarsilva"
          >
            Check My GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
