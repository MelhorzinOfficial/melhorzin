export interface GithubProject {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
}

export async function getGithubProjects(username: string = "raposoG"): Promise<GithubProject[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar projetos do GitHub: ${response.statusText}`);
    }

    const data: GithubProject[] = await response.json();

    // Filtrando apenas projetos públicos e não forked
    return data.filter((repo) => !repo.fork).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch (error) {
    console.error("Falha ao buscar projetos do GitHub:", error);
    return [];
  }
}
