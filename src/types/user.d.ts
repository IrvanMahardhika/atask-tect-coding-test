interface User {
  id: number;
  login: string;
  repos_url: string;
}

interface ResultSearchUser {
  data: {
    total_count: number | undefined;
    incomplete_results: boolean;
    items: User[];
  };
  status: number;
}

interface UserState {
  resultSearchUserState?: ResultSearchUser;
}
