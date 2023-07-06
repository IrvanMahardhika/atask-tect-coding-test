interface RepoItem {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
}

interface ResultGetRepo {
  data: RepoItem[];
  status: number;
}

interface RepoState {
  resultGetRepo?: ResultGetRepo[];
}
