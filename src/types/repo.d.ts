interface RepoItem {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
}

interface RepoState {
  repos?: RepoItem[];
}
