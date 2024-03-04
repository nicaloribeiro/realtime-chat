export type User = {
  username: string | null;
  name: string | null;
  email: string | null;
  socketId?: string | null;
  accessToken: string | null;
};

export type UserInitialState = {
  user: User;
  loading: boolean;
};
